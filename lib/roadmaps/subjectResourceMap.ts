export interface SubjectLessonResource {
  resourceType: 'official' | 'documentation' | 'article' | 'practice' | 'youtube';
  resourceUrl: string;
}

/**
 * Mapping of subject key -> step id -> lesson order index (1..4) -> resource details.
 * Ensures every single subject roadmap lesson links directly to specific, topic-relevant, working external learning resources.
 */
export const SUBJECT_RESOURCE_MAP: Record<string, Record<string, Record<number, SubjectLessonResource>>> = {
  // ==========================================
  // 1. DATABASE MANAGEMENT SYSTEMS (DBMS)
  // ==========================================
  'dbms': {
    'dbms-1': {
      1: { resourceType: 'official', resourceUrl: 'https://www.postgresql.org/docs/current/tutorial-concepts.html' },
      2: { resourceType: 'practice', resourceUrl: 'https://leetcode.com/problemset/database/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/relational-model-in-dbms/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=3EJw-JgKp4g' },
    },
    'dbms-2': {
      1: { resourceType: 'official', resourceUrl: 'https://www.postgresql.org/docs/current/tutorial-select.html' },
      2: { resourceType: 'practice', resourceUrl: 'https://sqlzoo.net/wiki/SELECT_basics' },
      3: { resourceType: 'article', resourceUrl: 'https://mode.com/sql-tutorial/sql-where/' },
      4: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/sql-ddl-dql-dml-dcl-tcl-commands/' },
    },
    'dbms-3': {
      1: { resourceType: 'official', resourceUrl: 'https://www.postgresql.org/docs/current/tutorial-join.html' },
      2: { resourceType: 'practice', resourceUrl: 'https://leetcode.com/problems/combine-two-tables/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.sqlshack.com/understanding-sql-joins/' },
      4: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/' },
    },
    'dbms-4': {
      1: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/dbms-normalization-1nf-2nf-3nf-bcnf/' },
      2: { resourceType: 'practice', resourceUrl: 'https://www.geeksforgeeks.org/functional-dependency-and-attribute-closure/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.gatevidyalay.com/normalization-in-dbms-1nf-2nf-3nf-bcnf/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=53d_7322e70' },
    },
    'dbms-5': {
      1: { resourceType: 'official', resourceUrl: 'https://www.postgresql.org/docs/current/indexes-types.html' },
      2: { resourceType: 'documentation', resourceUrl: 'https://use-the-index-luke.com/sql/indexing/b-tree' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/indexing-in-databases-set-1/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=1b-V13lV18k' },
    },
    'dbms-6': {
      1: { resourceType: 'official', resourceUrl: 'https://www.postgresql.org/docs/current/tutorial-transactions.html' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/acid-properties-in-dbms/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/transaction-isolation-levels-in-dbms/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=w217Vp1vJdc' },
    },
    'dbms-7': {
      1: { resourceType: 'official', resourceUrl: 'https://www.postgresql.org/docs/current/using-explain.html' },
      2: { resourceType: 'documentation', resourceUrl: 'https://mode.com/sql-tutorial/sql-performance-tuning/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/query-optimization-in-dbms/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=Jm-M28Vf3eU' },
    },
    'dbms-8': {
      1: { resourceType: 'documentation', resourceUrl: 'https://github.com/donnemartin/system-design-primer#database' },
      2: { resourceType: 'practice', resourceUrl: 'https://www.geeksforgeeks.org/er-model-in-dbms/' },
      3: { resourceType: 'official', resourceUrl: 'https://aws.amazon.com/relational-database/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=5V9H1S6mZQA' },
    },
  },

  // ==========================================
  // 2. COMPUTER NETWORKS & SECURITY
  // ==========================================
  'computer-networks': {
    'cn-1': {
      1: { resourceType: 'documentation', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/basics-computer-networking/' },
      3: { resourceType: 'documentation', resourceUrl: 'https://www.cloudflare.com/learning/network-layer/what-is-latency/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=IPvYjXCsTg8' },
    },
    'cn-2': {
      1: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/layers-of-osi-model/' },
      2: { resourceType: 'documentation', resourceUrl: 'https://www.cloudflare.com/learning/network-layer/what-is-the-osi-model/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/tcp-ip-model/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=3qnY555xQyc' },
    },
    'cn-3': {
      1: { resourceType: 'official', resourceUrl: 'https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html' },
      2: { resourceType: 'practice', resourceUrl: 'https://www.subnetting.net/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/ip-addressing-and-subnetting/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=ecCuyq-Wprc' },
    },
    'cn-4': {
      1: { resourceType: 'documentation', resourceUrl: 'https://www.cloudflare.com/learning/ddos/glossary/user-datagram-protocol-udp/' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/differences-between-tcp-and-udp/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/tcp-3-way-handshake-process/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=uwoD5P5gV84' },
    },
    'cn-5': {
      1: { resourceType: 'documentation', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview' },
      2: { resourceType: 'documentation', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status' },
      3: { resourceType: 'documentation', resourceUrl: 'https://www.cloudflare.com/learning/ssl/what-is-https/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=a-sBfyiXysI' },
    },
    'cn-6': {
      1: { resourceType: 'documentation', resourceUrl: 'https://www.cloudflare.com/learning/dns/what-is-dns/' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/domain-name-system-dns-in-application-layer/' },
      3: { resourceType: 'documentation', resourceUrl: 'https://www.cloudflare.com/learning/dns/what-is-recursive-dns/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=27r4Bzur5SU' },
    },
    'cn-7': {
      1: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/routing-in-computer-networks/' },
      2: { resourceType: 'documentation', resourceUrl: 'https://www.cloudflare.com/learning/network-layer/what-is-bgp/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/network-address-translation-nat/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=0h59f8v1rTY' },
    },
    'cn-8': {
      1: { resourceType: 'documentation', resourceUrl: 'https://www.cloudflare.com/learning/network-layer/what-is-network-security/' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/introduction-of-firewalls-in-computer-network/' },
      3: { resourceType: 'documentation', resourceUrl: 'https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=gT8x4Jj5iLE' },
    },
  },

  // ==========================================
  // 3. OPERATING SYSTEMS (OS)
  // ==========================================
  'operating-systems': {
    'os-1': {
      1: { resourceType: 'official', resourceUrl: 'https://pages.cs.wisc.edu/~remzi/OSTEP/intro.pdf' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/introduction-of-operating-system-set-1/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/dual-mode-operations-in-operating-system/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=vBURTt97EkA' },
    },
    'os-2': {
      1: { resourceType: 'official', resourceUrl: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/process-table-and-process-control-block-pcb/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/multithreading-in-operating-system/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=1b-V13lV18k' },
    },
    'os-3': {
      1: { resourceType: 'official', resourceUrl: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf' },
      2: { resourceType: 'practice', resourceUrl: 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/program-for-round-robin-scheduling-for-same-arrival-time/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=EWkUbs6jWxs' },
    },
    'os-4': {
      1: { resourceType: 'official', resourceUrl: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-semaphores.pdf' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/introduction-of-process-synchronization/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/mutex-vs-semaphore/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=ph2acVO0Hvw' },
    },
    'os-5': {
      1: { resourceType: 'official', resourceUrl: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/' },
      3: { resourceType: 'practice', resourceUrl: 'https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=r_DxOEwbB_E' },
    },
    'os-6': {
      1: { resourceType: 'official', resourceUrl: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-paging.pdf' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/memory-management-in-operating-system/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/translation-lookaside-buffer-tlb-in-paging/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=p4vI8s2m8cE' },
    },
    'os-7': {
      1: { resourceType: 'official', resourceUrl: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys.pdf' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/page-fault-handling-in-operating-system/' },
      3: { resourceType: 'practice', resourceUrl: 'https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=2O723z7kR5Q' },
    },
    'os-8': {
      1: { resourceType: 'official', resourceUrl: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-implementation.pdf' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/file-systems-in-operating-system/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/inode-in-operating-system/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=VpT9Z8-x4w8' },
    },
  },

  // ==========================================
  // 4. DATA STRUCTURES & ALGORITHMS (DSA)
  // ==========================================
  'dsa': {
    'dsa-1': {
      1: { resourceType: 'documentation', resourceUrl: 'https://www.geeksforgeeks.org/array-data-structure/' },
      2: { resourceType: 'practice', resourceUrl: 'https://leetcode.com/problems/two-sum/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=KLlXCFG5TnA' },
    },
    'dsa-2': {
      1: { resourceType: 'documentation', resourceUrl: 'https://www.geeksforgeeks.org/two-pointers-technique/' },
      2: { resourceType: 'practice', resourceUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/window-sliding-technique/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=0pTn_P_65eA' },
    },
    'dsa-3': {
      1: { resourceType: 'documentation', resourceUrl: 'https://www.geeksforgeeks.org/linked-list-data-structure/' },
      2: { resourceType: 'practice', resourceUrl: 'https://leetcode.com/problems/reverse-linked-list/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=G0_I-ZF0S38' },
    },
    'dsa-4': {
      1: { resourceType: 'documentation', resourceUrl: 'https://www.geeksforgeeks.org/stack-data-structure/' },
      2: { resourceType: 'practice', resourceUrl: 'https://leetcode.com/problems/valid-parentheses/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/introduction-to-monotonic-stack/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=WTzjTskXMgY' },
    },
    'dsa-5': {
      1: { resourceType: 'documentation', resourceUrl: 'https://www.geeksforgeeks.org/binary-search/' },
      2: { resourceType: 'practice', resourceUrl: 'https://leetcode.com/problems/binary-search/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/binary-search-on-answer/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=V_T5NuccwRA' },
    },
    'dsa-6': {
      1: { resourceType: 'documentation', resourceUrl: 'https://www.geeksforgeeks.org/binary-tree-data-structure/' },
      2: { resourceType: 'practice', resourceUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=OnSn2XEQ4MY' },
    },
    'dsa-7': {
      1: { resourceType: 'documentation', resourceUrl: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/' },
      2: { resourceType: 'practice', resourceUrl: 'https://leetcode.com/problems/number-of-islands/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/difference-between-bfs-and-dfs/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=pcKY4hjDrxk' },
    },
    'dsa-8': {
      1: { resourceType: 'documentation', resourceUrl: 'https://www.geeksforgeeks.org/dynamic-programming/' },
      2: { resourceType: 'practice', resourceUrl: 'https://leetcode.com/problems/climbing-stairs/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=73r3KWiEvyk' },
    },
  },

  // ==========================================
  // 5. FULL-STACK WEB DEVELOPMENT
  // ==========================================
  'web-development': {
    'web-1': {
      1: { resourceType: 'official', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      2: { resourceType: 'documentation', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox' },
      3: { resourceType: 'article', resourceUrl: 'https://www.w3schools.com/css/css_boxmodel.asp' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=K74l26pE4YA' },
    },
    'web-2': {
      1: { resourceType: 'official', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps' },
      2: { resourceType: 'documentation', resourceUrl: 'https://javascript.info/closure' },
      3: { resourceType: 'article', resourceUrl: 'https://javascript.info/arrow-functions-basics' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=DHjaxurVAtQ' },
    },
    'web-3': {
      1: { resourceType: 'official', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction' },
      2: { resourceType: 'documentation', resourceUrl: 'https://javascript.info/event-delegation' },
      3: { resourceType: 'article', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=0ik6X4DJK6w' },
    },
    'web-4': {
      1: { resourceType: 'official', resourceUrl: 'https://react.dev/learn/describing-the-ui' },
      2: { resourceType: 'official', resourceUrl: 'https://react.dev/learn/passing-props-to-a-component' },
      3: { resourceType: 'official', resourceUrl: 'https://react.dev/learn/rendering-lists' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=QFaFIcGhPoM' },
    },
    'web-5': {
      1: { resourceType: 'official', resourceUrl: 'https://react.dev/learn/state-a-components-memory' },
      2: { resourceType: 'official', resourceUrl: 'https://react.dev/learn/synchronizing-with-effects' },
      3: { resourceType: 'documentation', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=TNhaISOUy6Q' },
    },
    'web-6': {
      1: { resourceType: 'official', resourceUrl: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs' },
      2: { resourceType: 'official', resourceUrl: 'https://expressjs.com/en/guide/routing.html' },
      3: { resourceType: 'documentation', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4' },
    },
    'web-7': {
      1: { resourceType: 'official', resourceUrl: 'https://auth0.com/docs/secure/tokens/json-web-tokens' },
      2: { resourceType: 'documentation', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS' },
      3: { resourceType: 'official', resourceUrl: 'https://owasp.org/www-project-top-ten/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=mbsmsi7l3r4' },
    },
    'web-8': {
      1: { resourceType: 'official', resourceUrl: 'https://vercel.com/docs/frameworks/nextjs' },
      2: { resourceType: 'documentation', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/Performance' },
      3: { resourceType: 'official', resourceUrl: 'https://nextjs.org/docs/app/building-your-application/rendering' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=3xDAU5cvi5U' },
    },
  },

  // ==========================================
  // 6. MOBILE APP DEVELOPMENT
  // ==========================================
  'app-development': {
    'app-1': {
      1: { resourceType: 'official', resourceUrl: 'https://reactnative.dev/docs/intro-react-native-components' },
      2: { resourceType: 'official', resourceUrl: 'https://docs.flutter.dev/ui/layout' },
      3: { resourceType: 'official', resourceUrl: 'https://developer.android.com/topic/architecture' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=0-S5a0eXPoc' },
    },
    'app-2': {
      1: { resourceType: 'official', resourceUrl: 'https://reactnavigation.org/docs/getting-started/' },
      2: { resourceType: 'official', resourceUrl: 'https://docs.flutter.dev/ui/navigation' },
      3: { resourceType: 'official', resourceUrl: 'https://reactnative.dev/docs/flexbox' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=OmQCU-3gOKg' },
    },
    'app-3': {
      1: { resourceType: 'official', resourceUrl: 'https://redux-toolkit.js.org/tutorials/quick-start' },
      2: { resourceType: 'official', resourceUrl: 'https://zustand.docs.pmnd.rs/getting-started/introduction' },
      3: { resourceType: 'official', resourceUrl: 'https://docs.flutter.dev/data-and-backend/state-mgmt/intro' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=NqzdVN2tyvQ' },
    },
    'app-4': {
      1: { resourceType: 'official', resourceUrl: 'https://reactnative.dev/docs/network' },
      2: { resourceType: 'official', resourceUrl: 'https://tanstack.com/query/latest/docs/framework/react/overview' },
      3: { resourceType: 'documentation', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=gvF6sFIPbZs' },
    },
    'app-5': {
      1: { resourceType: 'official', resourceUrl: 'https://react-native-async-storage.github.io/async-storage/docs/install/' },
      2: { resourceType: 'official', resourceUrl: 'https://www.sqlite.org/index.html' },
      3: { resourceType: 'documentation', resourceUrl: 'https://github.com/mrousavy/react-native-mmkv' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=90XvVwP_4aI' },
    },
    'app-6': {
      1: { resourceType: 'official', resourceUrl: 'https://rnfirebase.io/auth/usage' },
      2: { resourceType: 'official', resourceUrl: 'https://docs.expo.dev/versions/latest/sdk/local-authentication/' },
      3: { resourceType: 'official', resourceUrl: 'https://auth0.com/docs/quickstart/native/react-native' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=qT_VkWyS_tU' },
    },
    'app-7': {
      1: { resourceType: 'official', resourceUrl: 'https://firebase.google.com/docs/cloud-messaging' },
      2: { resourceType: 'official', resourceUrl: 'https://docs.expo.dev/versions/latest/sdk/notifications/' },
      3: { resourceType: 'official', resourceUrl: 'https://developer.android.com/develop/ui/views/notifications' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=2f3qIuK-p2g' },
    },
    'app-8': {
      1: { resourceType: 'official', resourceUrl: 'https://docs.expo.dev/build/introduction/' },
      2: { resourceType: 'official', resourceUrl: 'https://developer.android.com/studio/publish' },
      3: { resourceType: 'official', resourceUrl: 'https://developer.apple.com/documentation/appstoreconnectapi' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=yGj9Ssc6M6Y' },
    },
  },

  // ==========================================
  // 7. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
  // ==========================================
  'ai-ml': {
    'aiml-1': {
      1: { resourceType: 'official', resourceUrl: 'https://docs.python.org/3/tutorial/index.html' },
      2: { resourceType: 'article', resourceUrl: 'https://realpython.com/python-data-structures/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/python-list-comprehension/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw' },
    },
    'aiml-2': {
      1: { resourceType: 'official', resourceUrl: 'https://numpy.org/doc/stable/user/quickstart.html' },
      2: { resourceType: 'official', resourceUrl: 'https://pandas.pydata.org/docs/user_guide/10min.html' },
      3: { resourceType: 'article', resourceUrl: 'https://www.w3schools.com/python/numpy/numpy_array_indexing.asp' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg' },
    },
    'aiml-3': {
      1: { resourceType: 'official', resourceUrl: 'https://scikit-learn.org/stable/modules/preprocessing.html' },
      2: { resourceType: 'practice', resourceUrl: 'https://www.kaggle.com/learn/data-cleaning' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/data-preprocessing-in-machine-learning/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=Gv9_4yMHFhI' },
    },
    'aiml-4': {
      1: { resourceType: 'documentation', resourceUrl: 'https://www.khanacademy.org/math/statistics-probability' },
      2: { resourceType: 'documentation', resourceUrl: 'https://seeing-theory.brown.edu/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/bayes-theorem-in-machine-learning/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=qBigTkBLU6g' },
    },
    'aiml-5': {
      1: { resourceType: 'official', resourceUrl: 'https://scikit-learn.org/stable/modules/linear_model.html' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/ml-linear-regression/' },
      3: { resourceType: 'article', resourceUrl: 'https://realpython.com/linear-regression-in-python/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=nk2CQITm_eo' },
    },
    'aiml-6': {
      1: { resourceType: 'official', resourceUrl: 'https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html' },
      2: { resourceType: 'official', resourceUrl: 'https://scikit-learn.org/stable/modules/clustering.html#k-means' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/decision-tree-introduction-example/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=yIYKR4sgzI8' },
    },
    'aiml-7': {
      1: { resourceType: 'official', resourceUrl: 'https://scikit-learn.org/stable/modules/model_evaluation.html' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/confusion-matrix-machine-learning/' },
      3: { resourceType: 'official', resourceUrl: 'https://scikit-learn.org/stable/modules/cross_validation.html' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=4jRBRDbJemM' },
    },
    'aiml-8': {
      1: { resourceType: 'official', resourceUrl: 'https://scikit-learn.org/stable/modules/compose.html' },
      2: { resourceType: 'official', resourceUrl: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html' },
      3: { resourceType: 'official', resourceUrl: 'https://huggingface.co/learn/nlp-course/chapter1/1' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=i_LwzRVP7bg' },
    },
  },

  // ==========================================
  // 8. DATA SCIENCE & ANALYTICS
  // ==========================================
  'data-science': {
    'ds-1': {
      1: { resourceType: 'official', resourceUrl: 'https://docs.python.org/3/tutorial/datastructures.html' },
      2: { resourceType: 'article', resourceUrl: 'https://www.w3schools.com/python/python_file_handling.asp' },
      3: { resourceType: 'article', resourceUrl: 'https://realpython.com/python-for-data-science/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI' },
    },
    'ds-2': {
      1: { resourceType: 'official', resourceUrl: 'https://numpy.org/doc/stable/user/basics.creation.html' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/matrix-manipulation-in-python-using-numpy/' },
      3: { resourceType: 'article', resourceUrl: 'https://realpython.com/numpy-array-programming/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=QUT1VHiLg5w' },
    },
    'ds-3': {
      1: { resourceType: 'official', resourceUrl: 'https://pandas.pydata.org/docs/user_guide/dsintro.html' },
      2: { resourceType: 'official', resourceUrl: 'https://pandas.pydata.org/docs/user_guide/basics.html' },
      3: { resourceType: 'article', resourceUrl: 'https://realpython.com/pandas-merge-join-concat/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=ZyhVqG_NzdU' },
    },
    'ds-4': {
      1: { resourceType: 'official', resourceUrl: 'https://pandas.pydata.org/docs/user_guide/missing_data.html' },
      2: { resourceType: 'practice', resourceUrl: 'https://www.kaggle.com/code/alexisbcook/handling-missing-values' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/data-cleansing-in-python/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=NYg6v5Yn-zA' },
    },
    'ds-5': {
      1: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/exploratory-data-analysis-in-python/' },
      2: { resourceType: 'practice', resourceUrl: 'https://www.kaggle.com/learn/data-visualization' },
      3: { resourceType: 'article', resourceUrl: 'https://towardsdatascience.com/exploratory-data-analysis-eda-python-871787a35b45' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=xvqsFTUsOmc' },
    },
    'ds-6': {
      1: { resourceType: 'official', resourceUrl: 'https://docs.scipy.org/doc/scipy/tutorial/stats.html' },
      2: { resourceType: 'documentation', resourceUrl: 'https://www.khanacademy.org/math/statistics-probability/significance-tests-one-sample' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/hypothesis-testing-in-statistics/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=vemZtEM63GY' },
    },
    'ds-7': {
      1: { resourceType: 'official', resourceUrl: 'https://matplotlib.org/stable/users/index.html' },
      2: { resourceType: 'official', resourceUrl: 'https://seaborn.pydata.org/tutorial.html' },
      3: { resourceType: 'article', resourceUrl: 'https://realpython.com/python-matplotlib-guide/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=0P7QnIQDBJY' },
    },
    'ds-8': {
      1: { resourceType: 'official', resourceUrl: 'https://www.postgresql.org/docs/current/functions-aggregate.html' },
      2: { resourceType: 'official', resourceUrl: 'https://www.postgresql.org/docs/current/tutorial-window.html' },
      3: { resourceType: 'documentation', resourceUrl: 'https://mode.com/sql-tutorial/sql-window-functions/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=7mz73uXD9DA' },
    },
  },

  // ==========================================
  // 9. DEVOPS & CLOUD INFRASTRUCTURE
  // ==========================================
  'devops': {
    'devops-1': {
      1: { resourceType: 'documentation', resourceUrl: 'https://linuxjourney.com/' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/linux-commands-cheat-sheet/' },
      3: { resourceType: 'official', resourceUrl: 'https://www.gnu.org/software/bash/manual/bash.html' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=sWbEDqQlp5c' },
    },
    'devops-2': {
      1: { resourceType: 'official', resourceUrl: 'https://git-scm.com/book/en/v2/Getting-Started-Git-Basics' },
      2: { resourceType: 'documentation', resourceUrl: 'https://www.atlassian.com/git/tutorials/using-branches' },
      3: { resourceType: 'documentation', resourceUrl: 'https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=hwP7VQKmCns' },
    },
    'devops-3': {
      1: { resourceType: 'documentation', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/Security' },
      2: { resourceType: 'documentation', resourceUrl: 'https://www.cloudflare.com/learning/dns/what-is-dns/' },
      3: { resourceType: 'official', resourceUrl: 'https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=2T_2-B6v2xM' },
    },
    'devops-4': {
      1: { resourceType: 'official', resourceUrl: 'https://docs.docker.com/get-started/' },
      2: { resourceType: 'official', resourceUrl: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/multi-stage-builds-in-docker/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=3c-iBn73dDE' },
    },
    'devops-5': {
      1: { resourceType: 'official', resourceUrl: 'https://docs.github.com/en/actions/quickstart' },
      2: { resourceType: 'official', resourceUrl: 'https://docs.gitlab.com/ee/ci/' },
      3: { resourceType: 'article', resourceUrl: 'https://martinfowler.com/articles/continuousIntegration.html' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=R8_veQiYBjU' },
    },
    'devops-6': {
      1: { resourceType: 'official', resourceUrl: 'https://docs.aws.amazon.com/whitepapers/latest/aws-overview/introduction.html' },
      2: { resourceType: 'official', resourceUrl: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html' },
      3: { resourceType: 'official', resourceUrl: 'https://cloud.google.com/architecture' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=r4YIdn2eTk4' },
    },
    'devops-7': {
      1: { resourceType: 'official', resourceUrl: 'https://developer.hashicorp.com/terraform/tutorials' },
      2: { resourceType: 'official', resourceUrl: 'https://developer.hashicorp.com/terraform/language/state' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/infrastructure-as-code-iac/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=7xngnjfIlK4' },
    },
    'devops-8': {
      1: { resourceType: 'official', resourceUrl: 'https://prometheus.io/docs/introduction/overview/' },
      2: { resourceType: 'official', resourceUrl: 'https://grafana.com/docs/grafana/latest/getting-started/' },
      3: { resourceType: 'official', resourceUrl: 'https://kubernetes.io/docs/concepts/cluster-administration/logging/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=h4Sl2190LnQ' },
    },
  },

  // ==========================================
  // 10. APTITUDE & QUANTITATIVE REASONING
  // ==========================================
  'aptitude': {
    'apt-1': {
      1: { resourceType: 'practice', resourceUrl: 'https://www.indiabix.com/aptitude/percentage/' },
      2: { resourceType: 'practice', resourceUrl: 'https://www.indiabix.com/aptitude/ratio-and-proportion/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/aptitude-percentage-tricks/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=rwvNjFd6390' },
    },
    'apt-2': {
      1: { resourceType: 'practice', resourceUrl: 'https://www.indiabix.com/aptitude/average/' },
      2: { resourceType: 'practice', resourceUrl: 'https://www.indiabix.com/aptitude/numbers/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/number-system-in-quantitative-aptitude/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=gLh3F2h08Hk' },
    },
    'apt-3': {
      1: { resourceType: 'practice', resourceUrl: 'https://www.indiabix.com/aptitude/profit-and-loss/' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/profit-and-loss/' },
      3: { resourceType: 'article', resourceUrl: 'https://testbook.com/maths/profit-and-loss' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=zJg5nL3x-5Q' },
    },
    'apt-4': {
      1: { resourceType: 'practice', resourceUrl: 'https://www.indiabix.com/aptitude/time-and-work/' },
      2: { resourceType: 'practice', resourceUrl: 'https://www.indiabix.com/aptitude/pipes-and-cistern/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/time-and-work/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=KE7tQf9spPg' },
    },
    'apt-5': {
      1: { resourceType: 'practice', resourceUrl: 'https://www.indiabix.com/aptitude/time-and-distance/' },
      2: { resourceType: 'practice', resourceUrl: 'https://www.indiabix.com/aptitude/problems-on-trains/' },
      3: { resourceType: 'practice', resourceUrl: 'https://www.indiabix.com/aptitude/boats-and-streams/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=KzYt0Z1R8mY' },
    },
    'apt-6': {
      1: { resourceType: 'practice', resourceUrl: 'https://www.indiabix.com/aptitude/probability/' },
      2: { resourceType: 'documentation', resourceUrl: 'https://www.khanacademy.org/math/statistics-probability/probability-library' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/probability-in-aptitude/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=3Jz2hR6JgKk' },
    },
    'apt-7': {
      1: { resourceType: 'practice', resourceUrl: 'https://www.indiabix.com/aptitude/permutation-and-combination/' },
      2: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/permutations-and-combinations/' },
      3: { resourceType: 'article', resourceUrl: 'https://testbook.com/maths/permutation-and-combination' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=Xq33kG0f6J4' },
    },
    'apt-8': {
      1: { resourceType: 'practice', resourceUrl: 'https://www.indiabix.com/logical-reasoning/questions-and-answers/' },
      2: { resourceType: 'practice', resourceUrl: 'https://www.indiabix.com/data-interpretation/questions-and-answers/' },
      3: { resourceType: 'article', resourceUrl: 'https://www.geeksforgeeks.org/data-interpretation-concepts-and-tricks/' },
      4: { resourceType: 'youtube', resourceUrl: 'https://www.youtube.com/watch?v=yYJ4-Xz1z7c' },
    },
  }
};
