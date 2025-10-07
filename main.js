// https://github.com/zaknye/xcel_itron2mqtt

import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import { scheduler } from "node:timers/promises";
import { XMLParser } from "fast-xml-parser";

import config from "./config.js";

{
	let masked = structuredClone(config);
	masked.influx_token = "*****"
	console.log("Starting itron adapter with config: ", masked);
}

const request = async (mode, url, options, body = null) => {
	return new Promise((resolve, reject) => {
		const req = mode.request(url, options, resp => {
			const bin_data = [];
			resp.on("data", chunk => bin_data.push(chunk));
			resp.on("end", () => {
				let data = Buffer.concat(bin_data).toString();
				if (resp.statusCode >= 200 && resp.statusCode < 300) {
					resolve(data);
				} else {
					reject(new Error(`Status Code: ${resp.statusCode}\n${data}`));
				}
			});
		});
		req.on("error", reject);
		if (body !== null)
			req.write(body);
		req.end();
	});
}

const options = {
	key: fs.readFileSync(config.priv_key),
	cert: fs.readFileSync(config.pub_key),
	ciphers: `ECDHE-ECDSA-AES128-CCM8:@SECLEVEL=0`,
	rejectUnauthorized: false, // allow self-signed
	secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
	headers: { Accept: "*/*" },
};

const itron_url = `https://${config.itron_addr}:${config.itron_port}`;
const xml = new XMLParser();
const getReading = async path => request(https, `${itron_url}/${path}`, options)
	.then(data => xml.parse(data).Reading)

const influx_url = `http://${config.influx_addr}:${config.influx_port}`;
const influx_write_url = `${influx_url}/api/v3/write_lp?db=metrics&precision=second`;
const postMetric = async lines => {
	let options = {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${config.influx_token}`,
			"Content-Length": Buffer.byteLength(lines),
		}
	};
	return request(http, influx_write_url, options, lines);
}

function* iterInterval(interval_ms) {
	let target_ms = performance.now() + interval_ms;
	while (true) {
		let sleep_ms = target_ms - performance.now();
		target_ms += interval_ms;
		yield scheduler.wait(Math.max(0, sleep_ms)).then(() => true);
	}
}

// meter updates every 1s, so use 500ms (HZ/2) as polling interval
let interval = iterInterval(500);
let meter_ts = 0;
do {
	try {
		let [power, energy_produced, energy_consumed] = await Promise.all([
			getReading("upt/1/mr/1/r"),
			getReading("upt/1/mr/2/rs/1/r/1"),
			getReading("upt/1/mr/3/rs/1/r/1"),
		]);
		let utc_sec = power.timePeriod.start + power.timePeriod.duration;
		let power_w = power.value;
		let energy_wh = energy_consumed.value - energy_produced.value;

		if (utc_sec <= meter_ts)
			continue;
		meter_ts = utc_sec;

		let line = `itron power_w=${power_w}i,energy_wh=${energy_wh}i ${utc_sec}`;
		console.log(line);
		// post async
		postMetric(line);
	} catch (err) {
		console.error(err);
	}
} while (await interval.next().value)
