import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
	output: "standalone",
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
