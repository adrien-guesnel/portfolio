import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
	output: "standalone",
	// @swc/helpers >= 0.5.16 exposes its helpers through the `module-sync` export
	// condition, which Node 22+ honours for require() but @vercel/nft does not, so
	// the tracer only copies cjs/ and the standalone server crashes on boot.
	outputFileTracingIncludes: {
		"/**": ["node_modules/.pnpm/@swc+helpers@*/node_modules/@swc/helpers/esm/**/*"],
	},
	turbopack: {
		root: path.dirname('.'),
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
};

export default withNextIntl(nextConfig);
