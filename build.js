const metalsmith = require('metalsmith') 
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')
const discoverPartials = require('metalsmith-discover-partials')
const watch = require('metalsmith-watch')
const assets = require('metalsmith-assets')
const DEV = process.env.NODE_ENV === 'development'

let forge = metalsmith(__dirname)
	.source('./pages')
	.destination('./public')
	.use(markdown({
		tables: true,
	}))
	.use(discoverPartials({directory: 'templates'}))
	.use(layouts({directory: 'templates', default: 'default.hbs'}))
	.use(assets({ source: './assets', destination: './'}))

if (DEV) forge = forge.metadata({dev: true})

if (DEV) forge = forge.use(watch({
	paths: {
		'pages/**/*': true,
		'templates/**/*':"**/*",
		'assets/**/*': "**/*",
	},
	livereload: true
}))

forge.build(err => {console.log('ERROR:', err)})
