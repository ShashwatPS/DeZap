# DeZap

A scalable, event-driven automation platform inspired by Zapier. Build custom workflows and automate tasks across different services.

## Architecture

DeZap uses a microservices architecture with the following components:

| Service | Description | Port |
|---------|-------------|------|
| `primary-backend` | Core API and orchestration | 3000 |
| `hooks` | Webhook receiver service | 3002 |
| `processor` | Workflow execution engine | - |
| `processorTrigger` | Trigger event processor | - |
| `worker` | Background job processor | - |
| `workerTrigger` | Worker event triggers | - |
| `dezap_front` | Frontend UI | - |

### Tech Stack

- **Backend**: Node.js/TypeScript
- **Message Queue**: Apache Kafka
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Git

### Setup

1. Clone the repository:
```bash
git clone https://github.com/ShashwatPS/DeZap.git
cd DeZap
```

2. Copy environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start all services:
```bash
docker-compose up -d
```

4. Verify services are running:
```bash
# Primary backend health check
curl http://localhost:3000/health

# Check all containers
docker-compose ps
```

## Development

Each service can be developed independently. See individual service directories for specific setup instructions.

### Service Structure

```
DeZap/
├── primary-backend/    # Main API
├── hooks/              # Webhook handlers
├── processor/          # Workflow execution
├── processorTrigger/   # Event triggers
├── worker/             # Background jobs
├── workerTrigger/      # Job triggers
└── dezap_front/        # Frontend UI
```

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

[MIT License](LICENSE)
