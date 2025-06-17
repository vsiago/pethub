import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];

  // Ignorar domínio raiz e www
  if (subdomain === "localhost" || subdomain === "127" || subdomain === "www") {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();

  // Se o path já começa com o subdomínio (ex: /pet-da-iago em pet-da-iago.localhost), ok
  if (!url.pathname.startsWith(`/${subdomain}`)) {
    // Força o path para o slug do subdomínio
    url.pathname = `/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  // Se a URL estiver assim http://pet-da-iago.localhost:3000/pet-da-isis
  // Que é diferente do subdomínio pet-da-iago, redireciona para o certo:
  const pathSlug = url.pathname.split("/")[1];
  if (pathSlug !== subdomain) {
    url.pathname = `/${subdomain}`;
    return NextResponse.redirect(url);
  }

  // Segue normalmente
  return NextResponse.next();
}
