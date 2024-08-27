# doyouknowyourstuff

A project that generates a multiple-choice quiz based on any web URL using GenAI. Built with [Langflow](https://langflow.datastax.com).

Try the [demo](https://doyouknowyourstuff.tej.as/) today, or read the [blog post](https://www.datastax.com/blog) to learn more.

## Running Locally

1. Clone the repository
2. Rename .env.example to .env and fill in the required fields
3. Run `pnpm install` to install dependencies
4. Run `npm run dev` to start the development server

From there, you should be good to go!

## Setting up the Langflow API

This application depends on a Langflow workflow. To create your backend API, you can either run Langflow locally, or access it on [DataStax](https://langflow.datastax.com). Once there, create a new project and import `langflow.json` from this repo as the flow.

## Contributing

If you have any ideas on how to improve this project, feel free to open an issue or a pull request.
