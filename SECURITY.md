# Security Policy

## Reporting a vulnerability

Please do not open a public issue for a suspected security vulnerability. Contact the repository owner privately through GitHub with a clear description, reproduction steps, affected component, and potential impact.

Never include live API keys, passwords, JWT secrets, private user uploads, or personal data in an issue or pull request.

## Security expectations

- Keep secrets in environment variables.
- Use a long random `JWT_SECRET` in deployed environments.
- Restrict CORS origins in production.
- Use persistent, access-controlled storage for databases and uploads.
- Review uploaded file handling and service-to-service authentication before public deployment.
