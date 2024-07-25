import createMiddleware from "next-intl/middleware"

import { defaultLocale, locales } from "./app/navigation"

export default createMiddleware({
  locales,
  defaultLocale,
})

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
