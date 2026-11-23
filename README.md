# NEXORA — The Visual Technology Knowledge Universe
> **"Complex ideas. Beautifully understood."**  
> *Explore the ideas behind technology.*

NEXORA is an immersive visual knowledge-sharing platform where developers, systems engineers, computer science students, and curious minds explore, publish, and dissect intricate technical architectures through structured diagrams, visual explanations, and interactive engineering blueprints.

---

## 🌌 Brand & Visual Design System

- **Main Background**: `#0B1020`
- **Secondary Background**: `#11182A`
- **Card Surface**: `#171D32`
- **Elevated Surface**: `#202942`
- **Primary Brand Color**: `#7C5CFC` (Quantum Violet)
- **Electric Cyan**: `#20D9E8` (Active Technology Links & Orbitals)
- **Accent Lime**: `#B5F36A` (Key Architectural Discoveries & Successes)
- **Accent Coral**: `#FF8C66` (Featured Lessons & Highlights)
- **Primary Text**: `#F8FAFC`
- **Secondary Text**: `#A3AEC2`
- **Borders**: `#2A3348`

### Typography
- **Headings**: `Space Grotesk`
- **Body Text**: `Inter`
- **Code & Terminals**: `JetBrains Mono`

---

## 🚀 Key Features

1. **Original Geometric NEXORA Identity**:
   - Custom SVG geometric logo representing multi-dimensional isometric quantum knowledge nodes connected by energy vectors.
2. **Interactive Hero Knowledge Universe**:
   - Dynamic canvas with orbital satellites representing DSA, Docker, AI, System Design, Cloud, Networking, DBMS, and Web Dev.
   - Interactive mouse parallax, live hover tooltips, and click-to-explore filters.
3. **Bespoke Technical Illustrations**:
   - Custom vector illustrations for all 10 core engineering domains:
     - *Data Structures & Algorithms* (AVL/Red-Black trees, heaps, DP matrix, graph traversal)
     - *System Design* (Gateways, microservices, load balancers, distributed message streams)
     - *Docker & DevOps* (Linux namespaces, cgroups, OverlayFS stacked layers, runc)
     - *Artificial Intelligence* (Self-attention matrices, transformer heads, tensor flows)
     - *Computer Networks* (TCP 3-way handshake, OSI layers, DNS resolution, BGP routing)
     - *Operating Systems* (CPU registers, process scheduling, multi-level page tables, virtual memory)
     - *DBMS* (B+ Tree indexing, Write-Ahead Logging WAL, ACID transaction engine)
     - *Web Development* (Browser DOM tree, CSSOM, Render tree, V8 event loop)
     - *Cloud Computing* (VPC peering, S3 object stores, serverless lambda cold starts)
     - *Cybersecurity* (Asymmetric RSA/ECC key exchanges, Zero Trust boundaries, SHA-256)
4. **Immersive Content Viewer**:
   - High-fidelity visual slide viewer with zoom & pan controls (75% to 250%).
   - Fullscreen presentation mode.
   - Keyboard arrow navigation (`←`, `→`, `Esc`).
   - Deep architectural breakdown narratives with syntax-highlighted code snippets.
   - Live interactive commenting, likes, bookmarks, and author follow toggles.
5. **Creator Studio**:
   - Visual learning story publishing studio.
   - Drag-and-drop & order manipulation for image sequences.
   - Custom file upload support (FileReader for PNG, SVG, JPG, WebP) + built-in SVG diagram presets.
   - Real-time split preview, draft saving, and celebration confetti upon publishing.
6. **Command Palette & Global Search (`⌘K` / `Ctrl+K`)**:
   - Instant search across topics, lessons, tags, and verified creators.
7. **Curated Collections & Roadmaps**:
   - Multi-card stacked library views with custom collection authoring.
8. **Personal Dashboard & Reading Progress**:
   - Track active reading progress percentage per lesson, revisit bookmarked diagrams, and manage published lessons.
9. **Dual-Mode Persistence (Supabase + LocalStorage Demo Mode)**:
   - Complete `supabase_schema.sql` database schema with Row Level Security (RLS) policies, UUID relations, and query indexes.
   - Automatic local reactive fallback if Supabase credentials are not provided.

---

## 🛠️ Development & Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
