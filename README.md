## Development

### TODO

- [ ] use [t3 env](https://env.t3.gg/docs/nextjs) for env instead
- [ ] use [octokit](https://github.com/octokit/octokit.js) for github rest API instead
  - [ ] pagination for pulling repo data?
- [ ] use [remark](https://github.com/remarkjs/remark-frontmatter) for frontmatter parsing instead of regex
- [ ] bug: mdx comments causing issues?
- [ ] syntax highlighting for view mode post
- [ ] implement the Appearances tab on dashboard
- [ ] currently only has WYSIWYG editor, add a toggle for an editor mode that shows raw code with separate preview
- [ ] might be better to store owner display name in the `config.yaml`?

### Setup & Installation

#### Requirements

- Node version: v22.21.1

#### Run the Application

1. In the project root folder, create a `.env.local` file based on the `.env.local.example` and fill in the environment variables.

```bash
cp .env.example .env
```

2.  Install dependencies and run the development server.

```bash
npm i
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3. Go to [http://localhost:3000/signin](http://localhost:3000/signin) to sign in with your Github Account and set up the blog.
