import express from "express";
import "dotenv/config";
import * as Sentry from "@sentry/node";
import amenitiesRouter from "../src/routes/amenities.js";
import bookingsRouter from "../src/routes/bookings.js";
import hostsRouter from "../src/routes/hosts.js";
import propertiesRouter from "../src/routes/properties.js";
import reviewsRouter from "../src/routes/reviews.js";
import usersRouter from "../src/routes/users.js";
import loginRouter from "../src/routes/login.js";
import logMiddleware from "../src/middleware/logMiddleware.js";
import errorHandler from "../src/middleware/errorHandler.js";

const app = express();

Sentry.init({
  // dsn: process.env.SENTRY_DSN,
  dsn: "https://d4c91c227c69d08e3b444dfeb052ce81@o4507095338582016.ingest.de.sentry.io/4507508989165648",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    // new ProfilingIntegration(),
    // ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // profilesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(logMiddleware);

// Resource routes..
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  const html =
    "<h1>Booking-API</h1><h2>Welcome to our BOOKING_API</h2><p>By using: GET - POST - PUT & DELETE you can handle the bookings!</p>";
  res.send(html);
  res.send("Booking-API");
});

app.get("/about", (req, res) => {
  const html =
    "<h1>About bookings</h1><h2>Welcome to our BOOKING_API</h2><p>By using: GET - POST - PUT & DELETE you can handle the bookings!</p>";
  res.send(html);
  res.send("Booking-API");
});

// Trace errors..
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
// app.use(function onError(err, req, res, next) {
// The error id is attached to `res.sentry` to be returned
// and optionally displayed to the user for support.
// res.statusCode = 500;
// res.end(res.sentry + "\n");
// });

// This snippet contains an intentional error and can be used as a test to make sure that everything's working as expected.
// app.get("/debug-sentry", function mainHandler(req, res) {
// throw new Error("My first Sentry error!");
// });

// Error handling..
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
