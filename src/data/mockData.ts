import { Post, Creator, Collection, DailyConcept, WeeklyChallenge, TechCategory } from '../types';

export const CREATORS: Record<string, Creator> = {
  alex: {
    id: 'c-alex',
    name: 'Naveen Solanki',
    username: 'naveensolanki',
    avatarUrl: '/images/author/naveen_techie_avatar.svg',
    bio: 'Platform Creator & Lead Systems Architect of TatvaTech. Translating complex distributed systems, kernel architectures, and networks into visual learning experiences.',
    expertise: ['System Design', 'Cloud Computing', 'Docker & DevOps', 'Operating Systems', 'DBMS', 'Data Structures & Algorithms'],
    followersCount: 0,
    followingCount: 0,
    lessonsCount: 12,
    isFollowed: true,
    verified: true,
    github: 'https://github.com/Naveen-1705-pro',
    linkedin: 'https://www.linkedin.com/in/naveen-solanki-6a6434301?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    instagram: 'https://www.instagram.com/self_loop_naveen/',
    location: 'Greater Noida, India',
  }
};

/**
 * =========================================================================================
 * 🚀 NAVEEN SOLANKI'S AUTHENTIC VISUAL TOPICS (UPLOADED VIA CODE & DRIVE)
 * =========================================================================================
 * All images are sourced directly from the author's curated Google Drive repository:
 * "My_work" (1UyuJ72OLPZhzW-o97CgMnsgSHOQVrMH8)
 * 
 * To add a new visual topic, add a new Post object below!
 */
export const MOCK_POSTS: Post[] = [
  {
    "id": "post-docker-architecture",
    "title": "Docker Core Architecture & Containerization",
    "slug": "docker-core-architecture-containerization",
    "summary": "Deep visual dive into Docker internals: daemon architecture, container lifecycle, client-server engine, command breakdown, and namespace isolation.",
    "coverImage": "/images/drive/docker/01_Docker-part1_docker_topic_image1.png.jpg",
    "category": "Docker & DevOps",
    "tags": [
      "Docker",
      "DevOps",
      "Containers",
      "Architecture",
      "Linux Namespaces"
    ],
    creator: CREATORS.alex,
    "stepsCount": 10,
    "steps": [
      {
        "id": "post-docker-architecture-step-1",
        "stepNumber": 1,
        "title": "Docker Introduction & Problem Statement",
        "explanation": "Why containers replaced VMs: lightweight kernel-level isolation and standard packaging.",
        "imageUrl": "/images/drive/docker/01_Docker-part1_docker_topic_image1.png.jpg",
        "keyTakeaway": "Key takeaway from diagram 1: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-docker-architecture-step-2",
        "stepNumber": 2,
        "title": "Container vs Virtual Machine Deep Dive",
        "explanation": "Hardware virtualization vs OS-level virtualization with shared host kernel.",
        "imageUrl": "/images/drive/docker/02_Docker-part1_docker_topic_image2.png.jpg",
        "keyTakeaway": "Key takeaway from diagram 2: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-docker-architecture-step-3",
        "stepNumber": 3,
        "title": "Docker Engine & Daemon Architecture",
        "explanation": "How the Docker CLI communicates via REST API with dockerd, containerd, and runc.",
        "imageUrl": "/images/drive/docker/03_Docker-part1_docker_topic_image3.png.jpg",
        "keyTakeaway": "Key takeaway from diagram 3: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-docker-architecture-step-4",
        "stepNumber": 4,
        "title": "Docker Images vs Containers",
        "explanation": "Immutable image layers (UnionFS / overlay2) versus the ephemeral writable container layer.",
        "imageUrl": "/images/drive/docker/04_Docker-part1_docker_topic_image4.png.jpg",
        "keyTakeaway": "Key takeaway from diagram 4: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-docker-architecture-step-5",
        "stepNumber": 5,
        "title": "Container Lifecycle & State Machine",
        "explanation": "Created, Running, Paused, Restarting, and Dead states with signal handling (SIGTERM vs SIGKILL).",
        "imageUrl": "/images/drive/docker/05_Docker-part1_docker_topic_image5.png.jpg",
        "keyTakeaway": "Key takeaway from diagram 5: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-docker-architecture-step-6",
        "stepNumber": 6,
        "title": "Docker Storage, Volumes & Bind Mounts",
        "explanation": "Data persistence mechanisms: anonymous volumes, named volumes, and host bind mounts.",
        "imageUrl": "/images/drive/docker/06_Docker-part1_docker_topic_image6.png.jpg",
        "keyTakeaway": "Key takeaway from diagram 6: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-docker-architecture-step-7",
        "stepNumber": 7,
        "title": "Docker Essential CLI Commands: Part 1",
        "explanation": "Visual syntax and execution flow of docker run, build, pull, ps, and stop.",
        "imageUrl": "/images/drive/docker/07_Docker-part2_docker_commandimg1.png.jpg",
        "keyTakeaway": "Key takeaway from diagram 7: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-docker-architecture-step-8",
        "stepNumber": 8,
        "title": "Docker Essential CLI Commands: Part 2",
        "explanation": "Advanced commands: docker exec, logs, inspect, network, system prune, and compose.",
        "imageUrl": "/images/drive/docker/08_Docker-part2_docker_commandimg2.png.jpg",
        "keyTakeaway": "Key takeaway from diagram 8: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-docker-architecture-step-9",
        "stepNumber": 9,
        "title": "Docker Internal Bridge & Overlay Networking",
        "explanation": "How veth pairs, iptables NAT, and docker0 bridge facilitate inter-container networking.",
        "imageUrl": "/images/drive/docker/09_Docker-part2_dockerarc_imag1.png.jpg",
        "keyTakeaway": "Key takeaway from diagram 9: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-docker-architecture-step-10",
        "stepNumber": 10,
        "title": "Docker Multi-Stage Builds & Production Optimization",
        "explanation": "Minimizing attack surface and image size using multi-stage Dockerfiles.",
        "imageUrl": "/images/drive/docker/10_Docker-part2_dockerarc_imag2.png.jpg",
        "keyTakeaway": "Key takeaway from diagram 10: understand the data flow, component boundaries, and state changes."
      }
    ],
    "likesCount": 0,
    "bookmarksCount": 0,
    "viewsCount": 0,
    "createdAt": "2026-11-20T10:00:00Z",
    "readTimeMinutes": 12,
    "difficulty": "Beginner",
    "isFeatured": true
  },
  {
    "id": "post-bipartite-graph-recommendation",
    "title": "Bipartite Graph & Recommendation Systems",
    "slug": "bipartite-graph-recommendation-systems",
    "summary": "How two-set bipartite graph matching powers modern real-world recommendation engines, user-item graphs, and collaborative filtering.",
    "coverImage": "/images/drive/application_bipartite_graph_understanding_recommendation/01_image_1.jpg",
    "category": "Data Structures & Algorithms",
    "tags": [
      "Graph Theory",
      "DSA",
      "Algorithms",
      "Recommendation Systems",
      "Bipartite Matching"
    ],
    creator: CREATORS.alex,
    "stepsCount": 5,
    "steps": [
      {
        "id": "post-bipartite-graph-recommendation-step-1",
        "stepNumber": 1,
        "title": "Bipartite Graph Fundamentals",
        "explanation": "Formal definition: partitioning vertices into disjoint sets U and V with no intra-set edges.",
        "imageUrl": "/images/drive/application_bipartite_graph_understanding_recommendation/01_image_1.jpg",
        "keyTakeaway": "Key takeaway from diagram 1: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-bipartite-graph-recommendation-step-2",
        "stepNumber": 2,
        "title": "User-Item Interaction Modeling",
        "explanation": "Constructing the bipartite graph between users and products/movies with edge weights.",
        "imageUrl": "/images/drive/application_bipartite_graph_understanding_recommendation/02_Image_2.jpg",
        "keyTakeaway": "Key takeaway from diagram 2: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-bipartite-graph-recommendation-step-3",
        "stepNumber": 3,
        "title": "Maximum Bipartite Matching Algorithm",
        "explanation": "Augmenting path theorem, Ford-Fulkerson and Hopcroft-Karp algorithms visualized.",
        "imageUrl": "/images/drive/application_bipartite_graph_understanding_recommendation/03_Image_3.jpg",
        "keyTakeaway": "Key takeaway from diagram 3: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-bipartite-graph-recommendation-step-4",
        "stepNumber": 4,
        "title": "Collaborative Filtering on Bipartite Graphs",
        "explanation": "Simulating random walks and node embeddings (Graph Neural Networks) over bipartite connections.",
        "imageUrl": "/images/drive/application_bipartite_graph_understanding_recommendation/04_Image_4.jpg",
        "keyTakeaway": "Key takeaway from diagram 4: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-bipartite-graph-recommendation-step-5",
        "stepNumber": 5,
        "title": "Real-World Production Applications",
        "explanation": "Large-scale deployment at Netflix, Spotify, and Amazon for personalized feed ranking.",
        "imageUrl": "/images/drive/application_bipartite_graph_understanding_recommendation/05_Image_5.jpg",
        "keyTakeaway": "Key takeaway from diagram 5: understand the data flow, component boundaries, and state changes."
      }
    ],
    "likesCount": 0,
    "bookmarksCount": 0,
    "viewsCount": 0,
    "createdAt": "2026-11-20T10:00:00Z",
    "readTimeMinutes": 9,
    "difficulty": "Intermediate",
    "isFeatured": true
  },
  {
    "id": "post-hld-vs-lld-guide",
    "title": "High-Level (HLD) vs Low-Level (LLD) Design",
    "slug": "hld-vs-lld-system-design-guide",
    "summary": "Clear visual comparison bridging the macro architectural perspective of systems with granular micro design patterns and class schemas.",
    "coverImage": "/images/drive/hld_lld_understand/01_HLD_image1_png.jpg",
    "category": "System Design",
    "tags": [
      "System Design",
      "HLD",
      "LLD",
      "Software Engineering",
      "Architecture"
    ],
    creator: CREATORS.alex,
    "stepsCount": 2,
    "steps": [
      {
        "id": "post-hld-vs-lld-guide-step-1",
        "stepNumber": 1,
        "title": "High-Level Design (HLD) Architecture",
        "explanation": "Macro perspective: microservices, API gateways, databases, message brokers, caching tiers, and scalability.",
        "imageUrl": "/images/drive/hld_lld_understand/01_HLD_image1_png.jpg",
        "keyTakeaway": "Key takeaway from diagram 1: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-hld-vs-lld-guide-step-2",
        "stepNumber": 2,
        "title": "Low-Level Design (LLD) Implementation",
        "explanation": "Micro perspective: UML class diagrams, design patterns (Factory, Strategy, Observer), schema definitions, and clean code.",
        "imageUrl": "/images/drive/hld_lld_understand/02_HLD_LLD_2_png.jpg",
        "keyTakeaway": "Key takeaway from diagram 2: understand the data flow, component boundaries, and state changes."
      }
    ],
    "likesCount": 0,
    "bookmarksCount": 0,
    "viewsCount": 0,
    "createdAt": "2026-11-20T10:00:00Z",
    "readTimeMinutes": 8,
    "difficulty": "Beginner",
    "isFeatured": true
  },
  {
    "id": "post-what-happens-when-turn-on-computer",
    "title": "What Happens When You Turn On Your Computer?",
    "slug": "what-happens-when-you-turn-on-laptop",
    "summary": "From the physical power button to desktop login: BIOS/UEFI firmware, POST checks, bootloader (GRUB), kernel decompression, and init/systemd initialization.",
    "coverImage": "/images/drive/os_whathappen_turn_on_laptop/01_Image_1.jpg",
    "category": "Operating Systems",
    "tags": [
      "Operating Systems",
      "Boot Sequence",
      "UEFI",
      "Kernel",
      "System Architecture"
    ],
    creator: CREATORS.alex,
    "stepsCount": 6,
    "steps": [
      {
        "id": "post-what-happens-when-turn-on-computer-step-1",
        "stepNumber": 1,
        "title": "Power-On & Electrical Signal Propagation",
        "explanation": "Power Supply Unit (PSU) sends Power Good signal to the motherboard and CPU resets registers to reset vector.",
        "imageUrl": "/images/drive/os_whathappen_turn_on_laptop/01_Image_1.jpg",
        "keyTakeaway": "Key takeaway from diagram 1: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-what-happens-when-turn-on-computer-step-2",
        "stepNumber": 2,
        "title": "BIOS/UEFI Firmware & POST Routine",
        "explanation": "Firmware initializes hardware, runs Power-On Self Test, and identifies boot priority disks.",
        "imageUrl": "/images/drive/os_whathappen_turn_on_laptop/02_Image_2.jpg",
        "keyTakeaway": "Key takeaway from diagram 2: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-what-happens-when-turn-on-computer-step-3",
        "stepNumber": 3,
        "title": "Master Boot Record (MBR) & GPT Partitioning",
        "explanation": "Loading stage-1 bootloader code from partition table into RAM at memory address 0x7C00.",
        "imageUrl": "/images/drive/os_whathappen_turn_on_laptop/03_Image_3.jpg",
        "keyTakeaway": "Key takeaway from diagram 3: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-what-happens-when-turn-on-computer-step-4",
        "stepNumber": 4,
        "title": "Bootloader Execution: GRUB & Kernel Loading",
        "explanation": "Bootloader switches CPU to protected/long mode, loads vmlinuz and initramfs into system memory.",
        "imageUrl": "/images/drive/os_whathappen_turn_on_laptop/04_Image_4.jpg",
        "keyTakeaway": "Key takeaway from diagram 4: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-what-happens-when-turn-on-computer-step-5",
        "stepNumber": 5,
        "title": "Kernel Decompression & Hardware Probing",
        "explanation": "Linux kernel unpacks, initializes CPU cores, memory management (MMU/paging), and device drivers.",
        "imageUrl": "/images/drive/os_whathappen_turn_on_laptop/05_Image_5.jpg",
        "keyTakeaway": "Key takeaway from diagram 5: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-what-happens-when-turn-on-computer-step-6",
        "stepNumber": 6,
        "title": "Systemd / Init & Userspace Launch",
        "explanation": "PID 1 process spawns background system daemons, network services, display manager, and graphical desktop.",
        "imageUrl": "/images/drive/os_whathappen_turn_on_laptop/06_Image_6.jpg",
        "keyTakeaway": "Key takeaway from diagram 6: understand the data flow, component boundaries, and state changes."
      }
    ],
    "likesCount": 0,
    "bookmarksCount": 0,
    "viewsCount": 0,
    "createdAt": "2026-11-20T10:00:00Z",
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "isFeatured": true
  },
  {
    "id": "post-dbms-transactions-acid",
    "title": "DBMS Transactions & Concurrency Control",
    "slug": "dbms-transactions-acid-deep-dive",
    "summary": "Comprehensive visual guide to database transactions: Atomicity, Consistency, Isolation, Durability, write-ahead logs, and schedule serializability.",
    "coverImage": "/images/drive/dbms_transaction_knowledge/01_Image_1.jpg",
    "category": "DBMS",
    "tags": [
      "DBMS",
      "Transactions",
      "ACID",
      "Concurrency Control",
      "Databases"
    ],
    creator: CREATORS.alex,
    "stepsCount": 4,
    "steps": [
      {
        "id": "post-dbms-transactions-acid-step-1",
        "stepNumber": 1,
        "title": "Transaction Concept & ACID Properties",
        "explanation": "Why transactions matter: all-or-nothing execution, invariant preservation, and crash recovery.",
        "imageUrl": "/images/drive/dbms_transaction_knowledge/01_Image_1.jpg",
        "keyTakeaway": "Key takeaway from diagram 1: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-dbms-transactions-acid-step-2",
        "stepNumber": 2,
        "title": "States of a Database Transaction",
        "explanation": "Active, Partially Committed, Committed, Failed, and Aborted state transitions.",
        "imageUrl": "/images/drive/dbms_transaction_knowledge/02_Image_2.jpg",
        "keyTakeaway": "Key takeaway from diagram 2: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-dbms-transactions-acid-step-3",
        "stepNumber": 3,
        "title": "Schedules & Conflict Serializability",
        "explanation": "Testing precedence graphs for cycles to guarantee non-conflicting concurrent transaction executions.",
        "imageUrl": "/images/drive/dbms_transaction_knowledge/03_Image_3.jpg",
        "keyTakeaway": "Key takeaway from diagram 3: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-dbms-transactions-acid-step-4",
        "stepNumber": 4,
        "title": "Two-Phase Locking (2PL) & MVCC",
        "explanation": "Growing and shrinking phases of strict 2PL alongside Multi-Version Concurrency Control internals.",
        "imageUrl": "/images/drive/dbms_transaction_knowledge/04_Image_4.jpg",
        "keyTakeaway": "Key takeaway from diagram 4: understand the data flow, component boundaries, and state changes."
      }
    ],
    "likesCount": 0,
    "bookmarksCount": 0,
    "viewsCount": 0,
    "createdAt": "2026-11-20T10:00:00Z",
    "readTimeMinutes": 10,
    "difficulty": "Advanced",
    "isFeatured": false
  },
  {
    "id": "post-hld-networking-infrastructure",
    "title": "HLD Networking & Scalable Infrastructure",
    "slug": "hld-networking-scalable-infrastructure",
    "summary": "Deep architectural visual guide to web-scale networks: global DNS anycast, CDN edge caching, L4 vs L7 load balancing, and reverse proxies.",
    "coverImage": "/images/drive/hld_networking/01_Image_1.jpg",
    "category": "Computer Networks",
    "tags": [
      "Networking",
      "System Design",
      "Load Balancer",
      "DNS",
      "CDN",
      "Architecture"
    ],
    creator: CREATORS.alex,
    "stepsCount": 6,
    "steps": [
      {
        "id": "post-hld-networking-infrastructure-step-1",
        "stepNumber": 1,
        "title": "Global Request Routing & Anycast DNS",
        "explanation": "How geographical DNS and BGP Anycast route users to the nearest regional data center.",
        "imageUrl": "/images/drive/hld_networking/01_Image_1.jpg",
        "keyTakeaway": "Key takeaway from diagram 1: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-hld-networking-infrastructure-step-2",
        "stepNumber": 2,
        "title": "CDN Edge Caching & POP Acceleration",
        "explanation": "Edge nodes, TLS termination, static asset distribution, and cache invalidation strategies.",
        "imageUrl": "/images/drive/hld_networking/02_Image_2.jpg",
        "keyTakeaway": "Key takeaway from diagram 2: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-hld-networking-infrastructure-step-3",
        "stepNumber": 3,
        "title": "L4 Transport vs L7 Application Load Balancers",
        "explanation": "TCP connection splicing vs HTTP header inspection, path routing, and gRPC multiplexing.",
        "imageUrl": "/images/drive/hld_networking/03_Image_3.jpg",
        "keyTakeaway": "Key takeaway from diagram 3: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-hld-networking-infrastructure-step-4",
        "stepNumber": 4,
        "title": "Reverse Proxy Architecture & API Gateways",
        "explanation": "Nginx/Envoy sidecar proxies, rate limiting, authentication, SSL offloading, and circuit breakers.",
        "imageUrl": "/images/drive/hld_networking/04_Image_4.jpg",
        "keyTakeaway": "Key takeaway from diagram 4: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-hld-networking-infrastructure-step-5",
        "stepNumber": 5,
        "title": "Inter-Service Mesh & RPC Protocols",
        "explanation": "East-west service-to-service communication with mTLS, Protocol Buffers, and Envoy mesh.",
        "imageUrl": "/images/drive/hld_networking/05_Image_5.jpg",
        "keyTakeaway": "Key takeaway from diagram 5: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-hld-networking-infrastructure-step-6",
        "stepNumber": 6,
        "title": "End-to-End Scalable Production Topology",
        "explanation": "The complete unified networking topology connecting client devices to database storage tiers.",
        "imageUrl": "/images/drive/hld_networking/06_Image_6.jpg",
        "keyTakeaway": "Key takeaway from diagram 6: understand the data flow, component boundaries, and state changes."
      }
    ],
    "likesCount": 0,
    "bookmarksCount": 0,
    "viewsCount": 0,
    "createdAt": "2026-11-20T10:00:00Z",
    "readTimeMinutes": 11,
    "difficulty": "Advanced",
    "isFeatured": false
  },
  {
    "id": "post-dbms-architecture-types",
    "title": "DBMS Architecture & System Models",
    "slug": "dbms-architecture-system-types",
    "summary": "Visual analysis of DBMS structural models: centralized databases, 1-tier, 2-tier client/server, 3-tier enterprise, and distributed partitioning.",
    "coverImage": "/images/drive/dbms_type_architecture/01_Image_1.jpg",
    "category": "DBMS",
    "tags": [
      "DBMS",
      "Architecture",
      "Client Server",
      "Distributed Systems",
      "SQL"
    ],
    creator: CREATORS.alex,
    "stepsCount": 6,
    "steps": [
      {
        "id": "post-dbms-architecture-types-step-1",
        "stepNumber": 1,
        "title": "DBMS Architectural Overview",
        "explanation": "The structural layers separating client applications, query processors, and physical storage engines.",
        "imageUrl": "/images/drive/dbms_type_architecture/01_Image_1.jpg",
        "keyTakeaway": "Key takeaway from diagram 1: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-dbms-architecture-types-step-2",
        "stepNumber": 2,
        "title": "1-Tier Architecture: Embedded Databases",
        "explanation": "Direct interaction with database engine on local disk (SQLite / desktop embedded storage).",
        "imageUrl": "/images/drive/dbms_type_architecture/02_Image_2.jpg",
        "keyTakeaway": "Key takeaway from diagram 2: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-dbms-architecture-types-step-3",
        "stepNumber": 3,
        "title": "2-Tier Client-Server Architecture",
        "explanation": "Client desktop GUI connecting directly to database server via ODBC/JDBC with business logic on client.",
        "imageUrl": "/images/drive/dbms_type_architecture/03_Image_3.jpg",
        "keyTakeaway": "Key takeaway from diagram 3: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-dbms-architecture-types-step-4",
        "stepNumber": 4,
        "title": "3-Tier Enterprise Architecture",
        "explanation": "Separating presentation, application server / business logic, and database server for scalability and security.",
        "imageUrl": "/images/drive/dbms_type_architecture/04_Image_4.jpg",
        "keyTakeaway": "Key takeaway from diagram 4: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-dbms-architecture-types-step-5",
        "stepNumber": 5,
        "title": "Distributed Database Architectures",
        "explanation": "Shared-nothing vs shared-disk architectures, horizontal sharding, and consensus replication.",
        "imageUrl": "/images/drive/dbms_type_architecture/05_Image_5.jpg",
        "keyTakeaway": "Key takeaway from diagram 5: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-dbms-architecture-types-step-6",
        "stepNumber": 6,
        "title": "Comparative Architectural Tradeoffs",
        "explanation": "Choosing the right database architecture based on latency, consistency, CAP theorem, and throughput.",
        "imageUrl": "/images/drive/dbms_type_architecture/06_Image_6.jpg",
        "keyTakeaway": "Key takeaway from diagram 6: understand the data flow, component boundaries, and state changes."
      }
    ],
    "likesCount": 0,
    "bookmarksCount": 0,
    "viewsCount": 0,
    "createdAt": "2026-11-20T10:00:00Z",
    "readTimeMinutes": 10,
    "difficulty": "Intermediate",
    "isFeatured": false
  },
  {
    "id": "post-three-level-dbms-architecture",
    "title": "Three-Level Database Architecture (ANSI/SPARC)",
    "slug": "three-level-architecture-dbms-ansi-sparc",
    "summary": "External level, Conceptual schema, and Internal physical storage: achieving true Logical and Physical Data Independence in modern database engines.",
    "coverImage": "/images/drive/three_level_architecture_dbms/01_Image_1.jpg",
    "category": "DBMS",
    "tags": [
      "DBMS",
      "ANSI SPARC",
      "Schemas",
      "Data Independence",
      "Database Design"
    ],
    creator: CREATORS.alex,
    "stepsCount": 6,
    "steps": [
      {
        "id": "post-three-level-dbms-architecture-step-1",
        "stepNumber": 1,
        "title": "The ANSI/SPARC Vision",
        "explanation": "Why three abstraction tiers are required to decouple end-user applications from disk block formats.",
        "imageUrl": "/images/drive/three_level_architecture_dbms/01_Image_1.jpg",
        "keyTakeaway": "Key takeaway from diagram 1: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-three-level-dbms-architecture-step-2",
        "stepNumber": 2,
        "title": "External / View Level",
        "explanation": "Custom tailor-made views for distinct user roles, hiding sensitive columns and computing virtual fields.",
        "imageUrl": "/images/drive/three_level_architecture_dbms/02_Image_2.jpg",
        "keyTakeaway": "Key takeaway from diagram 2: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-three-level-dbms-architecture-step-3",
        "stepNumber": 3,
        "title": "Conceptual / Logical Level",
        "explanation": "The single unified global schema defining all entities, attributes, relationships, and integrity constraints.",
        "imageUrl": "/images/drive/three_level_architecture_dbms/03_Image_3.jpg",
        "keyTakeaway": "Key takeaway from diagram 3: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-three-level-dbms-architecture-step-4",
        "stepNumber": 4,
        "title": "Internal / Physical Level",
        "explanation": "Data representation on disk: block allocations, B+ tree indexes, compression, and record offsets.",
        "imageUrl": "/images/drive/three_level_architecture_dbms/04_Image_4.jpg",
        "keyTakeaway": "Key takeaway from diagram 4: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-three-level-dbms-architecture-step-5",
        "stepNumber": 5,
        "title": "Logical Data Independence",
        "explanation": "Ability to alter conceptual schemas without breaking existing user views and application code.",
        "imageUrl": "/images/drive/three_level_architecture_dbms/05_Image_5.jpg",
        "keyTakeaway": "Key takeaway from diagram 5: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-three-level-dbms-architecture-step-6",
        "stepNumber": 6,
        "title": "Physical Data Independence",
        "explanation": "Altering indexes, storage devices, or disk structures without changing logical tables or queries.",
        "imageUrl": "/images/drive/three_level_architecture_dbms/06_Image_6.jpg",
        "keyTakeaway": "Key takeaway from diagram 6: understand the data flow, component boundaries, and state changes."
      }
    ],
    "likesCount": 0,
    "bookmarksCount": 0,
    "viewsCount": 0,
    "createdAt": "2026-11-20T10:00:00Z",
    "readTimeMinutes": 9,
    "difficulty": "Intermediate",
    "isFeatured": false
  },
  {
    "id": "post-os-process-states-lifecycle",
    "title": "OS Process States & Lifecycle Model",
    "slug": "os-process-state-machine-lifecycle",
    "summary": "Complete five-state and seven-state process models: New, Ready, Running, Waiting, Terminated, context switches, and CPU scheduling queues.",
    "coverImage": "/images/drive/os_process_state/01_Image_1.jpg",
    "category": "Operating Systems",
    "tags": [
      "Operating Systems",
      "Process Management",
      "PCB",
      "Scheduling",
      "Context Switch"
    ],
    creator: CREATORS.alex,
    "stepsCount": 2,
    "steps": [
      {
        "id": "post-os-process-states-lifecycle-step-1",
        "stepNumber": 1,
        "title": "Process Control Block (PCB) & State Machine",
        "explanation": "The anatomy of an active process: PID, program counter, CPU registers, memory limits, and file table.",
        "imageUrl": "/images/drive/os_process_state/01_Image_1.jpg",
        "keyTakeaway": "Key takeaway from diagram 1: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-os-process-states-lifecycle-step-2",
        "stepNumber": 2,
        "title": "State Transitions & Dispatcher Mechanics",
        "explanation": "Context switching, CPU preemption timer interrupts, I/O wait queues, and process termination.",
        "imageUrl": "/images/drive/os_process_state/02_Image_2.jpg",
        "keyTakeaway": "Key takeaway from diagram 2: understand the data flow, component boundaries, and state changes."
      }
    ],
    "likesCount": 0,
    "bookmarksCount": 0,
    "viewsCount": 0,
    "createdAt": "2026-11-20T10:00:00Z",
    "readTimeMinutes": 7,
    "difficulty": "Beginner",
    "isFeatured": false
  },
  {
    "id": "post-dfs-real-world-applications",
    "title": "DFS Applications & Cycle Detection",
    "slug": "dfs-applications-cycle-detection-topological-sort",
    "summary": "Depth-First Search in real-world systems: compiler dependency resolution, topological ordering, cycle detection in task graphs, and maze traversal.",
    "coverImage": "/images/drive/dfs_application/01_Image_1.jpg",
    "category": "Data Structures & Algorithms",
    "tags": [
      "DSA",
      "Graph Theory",
      "DFS",
      "Topological Sort",
      "Cycle Detection"
    ],
    creator: CREATORS.alex,
    "stepsCount": 2,
    "steps": [
      {
        "id": "post-dfs-real-world-applications-step-1",
        "stepNumber": 1,
        "title": "DFS Traversal Strategy & Recursion Call Stack",
        "explanation": "How DFS uses backtracking and stack frames to explore graph branches down to their terminal leaves.",
        "imageUrl": "/images/drive/dfs_application/01_Image_1.jpg",
        "keyTakeaway": "Key takeaway from diagram 1: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-dfs-real-world-applications-step-2",
        "stepNumber": 2,
        "title": "Compiler Dependency Resolution & Cycle Detection",
        "explanation": "Detecting circular dependencies in build tools (webpack, npm, Bazel) using 3-color (White/Grey/Black) DFS.",
        "imageUrl": "/images/drive/dfs_application/02_Image_2.jpg",
        "keyTakeaway": "Key takeaway from diagram 2: understand the data flow, component boundaries, and state changes."
      }
    ],
    "likesCount": 0,
    "bookmarksCount": 0,
    "viewsCount": 0,
    "createdAt": "2026-11-20T10:00:00Z",
    "readTimeMinutes": 8,
    "difficulty": "Intermediate",
    "isFeatured": false
  },
  {
    "id": "post-bfs-graph-real-life",
    "title": "BFS Graph in Real-Life Systems",
    "slug": "bfs-graph-connect-to-real-life",
    "summary": "Breadth-First Search visualized through practical everyday systems: LinkedIn degree connections, GPS shortest path route planning, and peer-to-peer gossip.",
    "coverImage": "/images/drive/bfs_graph__connect_to_real_life/01_Image_1.jpg",
    "category": "Data Structures & Algorithms",
    "tags": [
      "DSA",
      "Graph Theory",
      "BFS",
      "Shortest Path",
      "Social Networks"
    ],
    creator: CREATORS.alex,
    "stepsCount": 1,
    "steps": [
      {
        "id": "post-bfs-graph-real-life-step-1",
        "stepNumber": 1,
        "title": "BFS Wavefront Expansion & Real-World Networks",
        "explanation": "How FIFO queues guarantee finding the minimum-hop path in unweighted graphs for social degrees and network routing.",
        "imageUrl": "/images/drive/bfs_graph__connect_to_real_life/01_Image_1.jpg",
        "keyTakeaway": "Key takeaway from diagram 1: understand the data flow, component boundaries, and state changes."
      }
    ],
    "likesCount": 0,
    "bookmarksCount": 0,
    "viewsCount": 0,
    "createdAt": "2026-11-20T10:00:00Z",
    "readTimeMinutes": 6,
    "difficulty": "Beginner",
    "isFeatured": false
  },
  {
    "id": "post-destructors-memory-lifecycle",
    "title": "Destructors & Memory Deallocation",
    "slug": "destructors-memory-lifecycle-raii",
    "summary": "How destructors work under the hood in OOP, deterministic cleanup, RAII resource lifecycle management, and preventing memory leaks in systems software.",
    "coverImage": "/images/drive/destructor_knowledge/01_Image_1.jpg",
    "category": "System Design",
    "tags": [
      "OOP",
      "C++",
      "Memory Management",
      "RAII",
      "Destructors"
    ],
    creator: CREATORS.alex,
    "stepsCount": 2,
    "steps": [
      {
        "id": "post-destructors-memory-lifecycle-step-1",
        "stepNumber": 1,
        "title": "Object Destruction & Stack Unwinding",
        "explanation": "How the compiler automatically invokes destructors in reverse order of construction when scope exits.",
        "imageUrl": "/images/drive/destructor_knowledge/01_Image_1.jpg",
        "keyTakeaway": "Key takeaway from diagram 1: understand the data flow, component boundaries, and state changes."
      },
      {
        "id": "post-destructors-memory-lifecycle-step-2",
        "stepNumber": 2,
        "title": "Virtual Destructors & Preventing Memory Leaks",
        "explanation": "Why polymorphic base classes require virtual destructors to prevent partial object slicing and heap leaks.",
        "imageUrl": "/images/drive/destructor_knowledge/02_Image_2.jpg",
        "keyTakeaway": "Key takeaway from diagram 2: understand the data flow, component boundaries, and state changes."
      }
    ],
    "likesCount": 0,
    "bookmarksCount": 0,
    "viewsCount": 0,
    "createdAt": "2026-11-20T10:00:00Z",
    "readTimeMinutes": 6,
    "difficulty": "Beginner",
    "isFeatured": false
  }
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'col-systems-mastery',
    title: 'Systems & Architecture Mastery',
    description: 'Comprehensive visual journey through Docker containerization, High-Level vs Low-Level system design, and web-scale networking topologies.',
    coverImage: MOCK_POSTS[0].coverImage,
    category: 'System Design',
    posts: [MOCK_POSTS[0], MOCK_POSTS[2], MOCK_POSTS[5]],
    creator: CREATORS.alex,
    isPublic: true,
    updatedAt: '2026-11-22T14:00:00Z',
    likesCount: 0
  },
  {
    id: 'col-dbms-deep-dive',
    title: 'Database Internals & Storage Engines',
    description: 'Everything you need to master DBMS: 3-tier architectures, ANSI/SPARC data independence, ACID transactions, and concurrency protocols.',
    coverImage: MOCK_POSTS[4].coverImage,
    category: 'DBMS',
    posts: [MOCK_POSTS[4], MOCK_POSTS[6], MOCK_POSTS[7]],
    creator: CREATORS.alex,
    isPublic: true,
    updatedAt: '2026-11-21T09:30:00Z',
    likesCount: 0
  },
  {
    id: 'col-os-internals',
    title: 'Operating Systems & Hardware Boot Sequence',
    description: 'From electrical power-on through BIOS/UEFI, GRUB, and kernel initialization to multi-state process scheduling and context switching.',
    coverImage: MOCK_POSTS[3].coverImage,
    category: 'Operating Systems',
    posts: [MOCK_POSTS[3], MOCK_POSTS[8]],
    creator: CREATORS.alex,
    isPublic: true,
    updatedAt: '2026-11-20T18:00:00Z',
    likesCount: 0
  },
  {
    id: 'col-algorithms-visualized',
    title: 'Graph Theory & Real-World Algorithms',
    description: 'Bipartite graph matching in recommendation algorithms, BFS social network hops, and cycle-detecting DFS compilers.',
    coverImage: MOCK_POSTS[1].coverImage,
    category: 'Data Structures & Algorithms',
    posts: [MOCK_POSTS[1], MOCK_POSTS[9], MOCK_POSTS[10]],
    creator: CREATORS.alex,
    isPublic: true,
    updatedAt: '2026-11-19T11:15:00Z',
    likesCount: 0
  }
];

export const CATEGORIES_LIST: { id: TechCategory; name: TechCategory; shortDesc: string; count: number; topics: string[] }[] = [
  { id: 'Data Structures & Algorithms', name: 'Data Structures & Algorithms', shortDesc: 'Trees, Graphs, Bipartite matching, Dynamic Programming & Pathfinding', count: 3, topics: ['Bipartite Matching', 'BFS Real-World', 'DFS Cycles', 'Topological Sort'] },
  { id: 'System Design', name: 'System Design', shortDesc: 'HLD vs LLD, Microservices, Scalability, and OOP Architecture', count: 2, topics: ['HLD vs LLD', 'Destructors & RAII', 'Microservices', 'API Gateway'] },
  { id: 'Docker & DevOps', name: 'Docker & DevOps', shortDesc: 'Containers, Images, Daemons, Namespaces, CLI & Network Bridges', count: 1, topics: ['Docker Engine', 'Container Lifecycle', 'Docker CLI Commands', 'Bridge Networks'] },
  { id: 'Operating Systems', name: 'Operating Systems', shortDesc: 'Power-On Boot Sequence, Kernel, BIOS/UEFI, and Process States', count: 2, topics: ['Power-On to Login', 'UEFI & GRUB', 'Process State Machine', 'Context Switching'] },
  { id: 'DBMS', name: 'DBMS', shortDesc: 'ANSI/SPARC 3-Level Architecture, ACID Transactions & Concurrency', count: 3, topics: ['ACID & Transactions', '3-Level ANSI/SPARC', 'DBMS Models', 'Concurrency Control'] },
  { id: 'Computer Networks', name: 'Computer Networks', shortDesc: 'Scale Infrastructure, L4/L7 Load Balancers, Anycast & DNS', count: 1, topics: ['L4 vs L7 Load Balancers', 'Anycast DNS', 'Reverse Proxies', 'Network Mesh'] },
  { id: 'Web Development', name: 'Web Development', shortDesc: 'Full-stack architectures, Browser runtime, and API protocols', count: 0, topics: ['DOM Tree', 'V8 JIT Engine', 'HTTP/3 & QUIC', 'Event Loop'] },
  { id: 'Cloud Computing', name: 'Cloud Computing', shortDesc: 'Cloud infrastructure, Kubernetes, and Serverless platforms', count: 0, topics: ['Kubernetes Pods', 'Control Plane', 'Serverless', 'Multi-Region'] },
  { id: 'Artificial Intelligence', name: 'Artificial Intelligence', shortDesc: 'Neural networks, Deep Learning, and Vector embeddings', count: 0, topics: ['Neural Layers', 'Backpropagation', 'Transformers', 'Embeddings'] },
  { id: 'Cybersecurity', name: 'Cybersecurity', shortDesc: 'Network protection, Cryptography, and Zero Trust security', count: 0, topics: ['Public Key Crypto', 'TLS Handshake', 'Zero Trust', 'Firewalls'] }
];

export const DAILY_CONCEPT: DailyConcept = {
  id: 'daily-bipartite-recommendation',
  title: 'Bipartite Graph Recommendation Engine',
  teaser: 'How user-to-item bipartite matching models form the foundation of personalized suggestions on Netflix, Spotify, and YouTube.',
  explanation: 'By splitting vertices into two independent sets (Users on the left, Products on the right) and calculating augmenting paths or random walk probabilities, modern recommendation engines discover latent affinities without expensive all-pairs comparisons.',
  category: 'Data Structures & Algorithms',
  svgGraphicType: 'graph',
  postId: 'post-bipartite-graph-recommendation',
  date: 'Today'
};

export const WEEKLY_CHALLENGE: WeeklyChallenge = {
  id: 'wc-system-design-network',
  title: 'Design a High-Throughput L4/L7 Hybrid Gateway',
  prompt: 'Combine anycast DNS, eBPF-based L4 packet dispatching, and Envoy L7 path routing to handle 5 million requests per second.',
  category: 'Computer Networks',
  deadline: 'Ends Sunday at 23:59 UTC',
  participantsCount: 0,
  prizeText: 'Infrastructure Architect 2026'
};
