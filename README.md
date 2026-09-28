# Parking Lot Backend

Smart parking lot backend for vehicle entry, spot allocation, checkout, fee calculation, payments, and live availability monitoring.

## Tech Stack

- Node.js
- TypeScript
- Express
- Zod
- In-memory repositories for a clear low-level design implementation

## Run Locally

```bash
npm install
npm run dev
```

For a compiled run:

```bash
npm run build
npm start
```

The server defaults to `http://127.0.0.1:3000`. Override with `PORT` and `HOST`.

## API

Health:

```http
GET /health
```

Parking lot:

```http
GET /api/parking-lot/config
GET /api/parking-lot/availability
GET /api/parking-lot/monitoring
GET /api/parking-lot/tickets/:ticketId
POST /api/parking-lot/check-in
POST /api/parking-lot/check-out
POST /api/parking-lot/payments
```

Spots and floors:

```http
GET /api/parking-spots
PATCH /api/parking-spots/:spotId/status
GET /api/parking-floors
```

Domain modules:

```http
GET /api/tickets
GET /api/tickets/:ticketId
GET /api/payments
GET /api/payments/:paymentId
GET /api/vehicles
GET /api/vehicles/:plateNumber
GET /api/terminals/entrances
GET /api/terminals/exits
GET /api/rates
GET /api/rates/:vehicleType
GET /api/monitoring/availability
GET /api/monitoring/snapshot
```

## Example Flow

Check in:

```bash
curl -X POST http://127.0.0.1:3000/api/parking-lot/check-in \
  -H 'Content-Type: application/json' \
  -d '{
    "entranceId": "entry-north",
    "vehicle": {
      "plateNumber": "KA-01-AB-1234",
      "type": "car"
    }
  }'
```

Check out:

```bash
curl -X POST http://127.0.0.1:3000/api/parking-lot/check-out \
  -H 'Content-Type: application/json' \
  -d '{
    "ticketId": "ticket_id_from_check_in",
    "exitId": "exit-north"
  }'
```

Pay:

```bash
curl -X POST http://127.0.0.1:3000/api/parking-lot/payments \
  -H 'Content-Type: application/json' \
  -d '{
    "ticketId": "ticket_id_from_check_in",
    "method": "credit_card",
    "amount": 50
  }'
```

## Design Notes

- Spot allocation uses a strategy class that chooses the nearest compatible available spot for the entry terminal.
- State-changing workflows are guarded by a mutex so concurrent check-ins cannot take the same spot.
- Fee calculation is isolated behind an hourly strategy.
- Each module follows `api.ts -> module.index.ts -> module.controller.ts -> module.helper.ts -> module.service.ts -> module.repository.ts`.
- Controllers validate requests with Zod, helpers hold business rules, services provide a data-access boundary, and repositories own store access.
- The seed configuration can be changed in `src/helpers/parking-lot-config.ts` for another installation.
