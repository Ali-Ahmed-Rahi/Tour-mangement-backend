import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { TourRoutes } from "../modules/tour/tour.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { PaymentRoutes } from "../modules/payment/payment.route";

export const router = Router()

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes
  },
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: "/tour",
    route: TourRoutes
  },
  {
    path:"/booking",
    route:BookingRoutes
  },
  {
    path:"/payment",
    route:PaymentRoutes
  },
]


moduleRoutes.forEach((route) => {
  router.use(route.path, route.route)
})