import { getAllPostIds } from '../lib/posts';

function generateSiteMap(DOMAIN) {
	// load the posts from /posts folder
	const posts = getAllPostIds();

	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${DOMAIN}</loc>
     </url>
     ${posts
				.map(({ params }) => {
					return `
       <url>
           <loc>${DOMAIN}/posts/${params.id}</loc>
       </url>
     `;
				})
				.join('')}
   </urlset>
 `;
}

function SiteMap() {}

export async function getServerSideProps({ req, res }) {
	const { host } = req.headers;
	const protocol = req.headers['x-forwarded-proto'] || 'http';
	const DOMAIN = `${protocol}://${host}`;
	const sitemap = generateSiteMap(DOMAIN);

	res.setHeader('Content-Type', 'text/xml');
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}

export default SiteMap;
