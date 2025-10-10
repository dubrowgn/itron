# Itron Metering Agent Meter Readings and Reading Type Enumeration

With each successive version of the Itron Metering Agent more meter readings have been added. Below are tables of the meter reading capabilities of each agent version. However, this does not mean that the underlying meter that a metering agent version X.X.X is connected to supports all the meter readings that the agent supports. See [./ItronAgentApiImplementationNotes.md](./ItronAgentApiImplementationNotes.md) and the examples in [./Ieee2030dot5LibrariesUsageGuide.md](./Ieee2030dot5LibrariesUsageGuide.md) for more details concerning meter versus metering agent support of meter readings.

## Agent 1.X.X (v1)

| **#Index** | **Description**             | **Accumulation Behavior** | **Data Qualifier** | **Flow Direction** | **Kind**    | **Phase** | **UnitOfMeasure**                   |
| ---------- | --------------------------- | ------------------------- | ------------------ | ------------------ | ----------- | --------- | ----------------------------------- |
| 1          | Instantaneous Demand        | 12 - Instantaneous        | 2 - Average        | 1 - Forward        | 8 - Demand  | 0 - N/A   | 38 - W (Real power in Watts)        |
| 2          | Current Summation Received  | 9 - Summation             | 2 - Average        | 19 - Reverse       | 12 - Energy | 0 - N/A   | 72 - Wh (Real energy in Watt-hours) |
| 3          | Current Summation Delivered | 9 - Summation             | 2 - Average        | 1 - Forward        | 12 - Energy | 0 - N/A   | 72 - Wh (Real energy in Watt-hours) |



## Agent 2.X.X (v2)

There were no changes to existing (v1) reading types. 

| **#Index** | **Description**             | **Accumulation Behavior** | **Data Qualifier** | **Flow Direction** | **Kind**    | **Phase** | **UnitOfMeasure**                   |
| ---------- | --------------------------- | ------------------------- | ------------------ | ------------------ | ----------- | --------- | ----------------------------------- |
| 1          | Instantaneous Demand        | 12 - Instantaneous        | 2 - Average        | 1 - Forward        | 8 - Demand  | 0 - N/A   | 38 - W (Real power in Watts)        |
| 2          | Current Summation Received  | 9 - Summation             | 2 - Average        | 19 - Reverse       | 12 - Energy | 0 - N/A   | 72 - Wh (Real energy in Watt-hours) |
| 3          | Current Summation Delivered | 9 - Summation             | 2 - Average        | 1 - Forward        | 12 - Energy | 0 - N/A   | 72 - Wh (Real energy in Watt-hours) |
| 4    | VAh Received   | 9 - Summation | 2 - Average | 19 - Reverse | 12 - Energy | 0 - N/A | 71 - VAh (Apparent energy)  |
| 5    | VAh Delivered  | 9 - Summation | 2 - Average | 1 - Forward  | 12 - Energy | 0 - N/A | 71 - VAh (Apparent energy)  |
| 6    | VARh Received  | 9 - Summation | 2 - Average | 19 - Reverse | 12 - Energy | 0 - N/A | 73 - varh (Reactive energy) |
| 7    | VARh Delivered | 9 - Summation | 2 - Average | 1 - Forward  | 12 - Energy | 0 - N/A | 73 - varh (Reactive energy) |



## Agent 3.X.X (v3)

The major changes were as follows:

1. ⚠TOU WH and Current Summation types are indistinguishable: Must use the `Description` on their MeterReadings to determine their types.⚠

2. Data Qualifier of all (except for Max Demand types) changed from 2-Average to 0-N/A.
2. Add `Total` and `Net` FlowDirection types (`Net`used with Net intervals and `Total` not yet used).

| **#Index** | **Description**             | **Accumulation Behavior** | **Data Qualifier** | **Flow Direction** | **Kind**    | **Phase**     | **UnitOfMeasure**                         |
| -------- | --------------------------- | ------------------------- | ------------------ | ------------------ | ----------- | ------------- | ----------------------------------------- |
| 1        | Instantaneous Demand        | 12 - Instantaneous        | 0 - N/A            | 1 - Forward        | 8 - Demand  | 0 - N/A       | 38 - W (Real power in Watts)              |
| 2        | Current Summation Received  | 9 - Summation             | 0 - N/A            | 19 - Reverse       | 12 - Energy | 0 - N/A       | 72 - Wh (Real energy in Watt-hours)       |
| 3        | Current Summation Delivered | 9 - Summation             | 0 - N/A            | 1 - Forward        | 12 - Energy | 0 - N/A       | 72 - Wh (Real energy in Watt-hours)       |
| 4        | VAh Received                | 9 - Summation             | 0 - N/A            | 19 - Reverse       | 12 - Energy | 0 - N/A       | 71 - VAh (Apparent energy)                |
| 5        | VAh Delivered               | 9 - Summation             | 0 - N/A            | 1 - Forward        | 12 - Energy | 0 - N/A       | 71 - VAh (Apparent energy)                |
| 6        | VARh Received               | 9 - Summation             | 0 - N/A            | 19 - Reverse       | 12 - Energy | 0 - N/A       | 73 - VARh (Reactive energy)               |
| 7        | VARh Delivered              | 9 - Summation             | 0 - N/A            | 1 - Forward        | 12 - Energy | 0 - N/A       | 73 - VARh (Reactive energy)               |
| 8        | TOU WH Received             | 9 - Summation             | 0 - N/A            | 19 - Reverse       | 12 - Energy | 0 - N/A       | 72 - Wh (Real energy in Watt-hours)       |
| 9        | TOU WH Delivered            | 9 - Summation             | 0 - N/A            | 1 - Forward        | 12 - Energy | 0 - N/A       | 72 - Wh (Real energy in Watt-hours)       |
| 10       | WH Net (Interval)           | 4 - DeltaData             | 0 - N/A            | 4 - Net            | 12 - Energy | 0 - N/A       | 72 - Wh (Real energy in Watt-hours)       |
| 11       | WH Received (Interval)      | 4 - DeltaData             | 0 - N/A            | 19 - Reverse       | 12 - Energy | 0 - N/A       | 72 - Wh (Real energy in Watt-hours)       |
| 12       | WH Delivered (Interval)     | 4 - DeltaData             | 0 - N/A            | 1 - Forward        | 12 - Energy | 0 - N/A       | 72 - Wh (Real energy in Watt-hours)       |
| 13       | VAh Received (Interval)     | 4 - DeltaData             | 0 - N/A            | 19 - Reverse       | 12 - Energy | 0 - N/A       | 71 - VAh (Apparent energy)                |
| 14       | VAh Delivered (Interval)    | 4 - DeltaData             | 0 - N/A            | 1 - Forward        | 12 - Energy | 0 - N/A       | 71 - VAh (Reactive energy)                |
| 15       | VARh Received (Interval)    | 4 - DeltaData             | 0 - N/A            | 19 - Reverse       | 12 - Energy | 0 - N/A       | 73 - VARh (Reactive energy)               |
| 16       | VARh Delivered (Interval)   | 4 - DeltaData             | 0 - N/A            | 1 - Forward        | 12 - Energy | 0 - N/A       | 73 - VARh (Apparent energy)               |
| 17       | Max Demand Received         | 12 - Instantaneous        | 8 - Maximum        | 19 - Reverse       | 8 - Demand  | 0 - N/A       | 38 - W (Real power in Watts)              |
| 18       | Max Demand Delivered        | 12 - Instantaneous        | 8 - Maximum        | 1 - Forward        | 8 - Demand  | 0 - N/A       | 38 - W (Real power in Watts)              |
| 19       | Power Factor                | 12 - Instantaneous        | 0 - N/A            | 0 - N/A            | 0 - N/A     | 224 - ABC     | 65 - CosTheta (Displacement Power Factor) |
| 20       | Power Factor PhaseA         | 12 - Instantaneous        | 0 - N/A            | 0 - N/A            | 0 - N/A     | 128 - Phase A | 65 - CosTheta (Displacement Power Factor) |
| 21       | Power Factor PhaseB         | 12 - Instantaneous        | 0 - N/A            | 0 - N/A            | 0 - N/A     | 64 - Phase B  | 65 - CosTheta (Displacement Power Factor) |
| 22       | Power Factor PhaseC         | 12 - Instantaneous        | 0 - N/A            | 0 - N/A            | 0 - N/A     | 32 - Phase C  | 65 - CosTheta (Displacement Power Factor) |

