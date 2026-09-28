=====================DIRECTORY STRUCTURE====================
/Users/gautam/Desktop/personal-projects/Parking-Lot/src/modules

This is the main place where se write our codes for api.

- each module contains name of entity it is dealing with
- each module has following files
  - module.index.ts : contains routes
  - module.controller.ts : contains controller, validation of request is done(via validation file here), so that actual logic file is not concerend of request validation.
  - module.validator.ts : contains validation of requests, via Zod
  - module.helper.ts : contains business logic
  - moudle.service.ts : contains data access logic, so that helpers or business
    logic are dependent on this intermediary layer, and not directly on database
  - module.repository.ts: contains actual database calls
  - utils/\* : all helpers or, type declarations are done here, in different files. Type decalarations which will
    already present in respective model definiton files, can be reused, rather than recreating
- api.ts : this is file which have top level routing, for each modules (sinle file within modules directory, and not
  inside each module). They route to index.ts router of each modules.

/Users/gautam/Desktop/personal-projects/Parking-Lot/src/models

- contains models definitions: the type declarations will be done within this file only, and not other file

/Users/gautam/Desktop/personal-projects/Parking-Lot/src/helpers

- contains all the general helpers, which are used frequently by different modules, and not specific
  to single module

/Users/gautam/Desktop/personal-projects/Parking-Lot/src/utils

- contains all general utility functions, which are used frequently by different modules, and not specific. also
  contains commonly used type definitons

========================LLD PATTERNS===========================

- we will use strategy pattern whereever needed
- since mongodb already gives singleton connection, so we would not need single ton patten here
- SOLID principle will be used
- no other major patterns will be used

=======================CODE COMPLEXITY==========================

- Minimalistic codes, handling edge cases.
- can be understood easily, and refrenced later to see if required.
- comments will be used, but not overused. We would like to rely on good code design and clean codes.

=======================MODULES CACHING============================

- this is not explicit caching, rahter importing all the api.ts file, will do node module caching, which
  happens automatically.

====================PROJECT DETAILS================================

Brief
Project brief

Objective:
Design the low-level architecture for a backend system of a smart parking lot. This system should handle vehicle entry and exit management, parking space allocation, and fee calculation.

Problem Statement:
Imagine a parking lot in an urban area with multiple floors and numerous parking spots. Your task is to create a low-level design for a system that efficiently manages the parking process. The system should automatically assign parking spots based on vehicle size and availability, track the time each vehicle spends in the parking lot, and calculate parking fees upon exit.

Functional Requirements:

Parking Spot Allocation: Automatically assign an available parking spot to a vehicle when it enters, based on the vehicle’s size (e.g., motorcycle, car, bus).

Check-In and Check-Out: Record the entry and exit times of vehicles.

Parking Fee Calculation: Calculate fees based on the duration of stay and vehicle type.

Real-Time Availability Update: Update the availability of parking spots in real-time as vehicles enter and leave.

Design Aspects to Consider:

Data Model: Design a database schema to manage parking spots, vehicles, and parking transactions.

Algorithm for Spot Allocation: Develop an algorithm to efficiently assign parking spots to incoming vehicles.

Fee Calculation Logic: Implement logic to calculate fees based on parking duration and vehicle type.

Concurrency Handling: Ensure the system can handle multiple vehicles entering or exiting simultaneously.
