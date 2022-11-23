import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

export async function main() {
  const rootURL = Deno.args[0];
  const rootRes = await fetch(rootURL);
  const rootHtml = await rootRes.text();
  const rootDoc = new DOMParser().parseFromString(rootHtml, "text/html")!;
  for (const n of rootDoc.querySelectorAll("a")) {
    const url: string = n.getAttribute("href").trim();
    if (url.match("^https://github.com/[^/]+/[^/]+$")) {
      const res = await fetch(url);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html")!;
      const starCount = doc.querySelector("#repo-stars-counter-star")
        ?.textContent;
      console.log(`${url} ${starCount}`);
    }
  }
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main();
}
