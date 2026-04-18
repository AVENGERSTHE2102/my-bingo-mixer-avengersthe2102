# Lima VM for my-bingo-mixer

This repository includes an optional Lima VM configuration for development using lightweight Ubuntu VMs.

## Setup

1. Install Lima: https://lima-vm.io/
2. In the repo root, run:
   ```bash
   lima start lima/default.yaml
   ```
3. Open a shell into the VM:
   ```bash
   lima shell my-bingo-mixer
   ```
4. Inside the VM, install dependencies:
   ```bash
   cd ~/my-bingo-mixer-avengersthe2102
   npm install
   ```
5. Run the dev server:
   ```bash
   npm run dev
   ```

## Environment

The Lima VM is configured to install:
- Node.js 20
- npm
- Docker (via get.docker.com)
- Podman
- SSH for convenience

## Notes

- Port `4173` is forwarded from the guest to the host to access the Vite dev server.
- This VM is intended as an alternative local development environment, especially on macOS or Linux hosts where Lima is available.
