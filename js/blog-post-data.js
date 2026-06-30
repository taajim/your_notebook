/* =========================================================
   BLOG-POST-DATA.JS — Content for each article
   Keyed by the slug used in blog-post.html?post=<slug>
   ========================================================= */

var BLOG_POSTS = {

  "banker-algorithm": {
    title: "Understanding the Banker's Algorithm, one allocation at a time",
    topic: "Operating Systems",
    date: "June 18, 2026",
    readTime: "8 min read",
    cover: "../images/blog/post-1.svg",
    tags: ["Operating Systems", "Deadlock", "CSE 3203"],
    body: `
      <p>Of everything in the deadlock chapter, the Banker's Algorithm is the one that looks intimidating on paper and turns out to be mostly bookkeeping once you've drawn it out by hand a couple of times. This is the version of the explanation I wish I'd had before my CSE 3203 final.</p>

      <h2>The problem it solves</h2>
      <p>A system has a fixed number of resource instances. Multiple processes can request and release them over time. The danger is a state where every process is waiting on a resource that another waiting process is holding — a deadlock. The Banker's Algorithm avoids this by only granting a request if the resulting state is still <em>safe</em>: meaning there exists some order in which every process can still finish.</p>

      <h2>The three matrices</h2>
      <p>Every walkthrough starts with three tables, and keeping them straight is half the battle:</p>
      <ul>
        <li><strong>Allocation</strong> — what each process currently holds.</li>
        <li><strong>Max</strong> — the maximum each process could ever request.</li>
        <li><strong>Need</strong> — Max minus Allocation; what each process might still ask for.</li>
      </ul>
      <p>Alongside these, a single <strong>Available</strong> vector tracks unallocated instances of each resource type.</p>

      <h2>Running the safety check</h2>
      <p>The safety algorithm tries to find a process whose Need fits within Available. If one exists, pretend it finishes, add its Allocation back to Available, and repeat. If every process eventually "finishes" this way, the state is safe. If you get stuck with processes left over that none of them can satisfy, the state is unsafe — and the original request should never have been granted.</p>

      <h2>Where it actually clicked for me</h2>
      <p>I stopped thinking of it as an algorithm and started thinking of it as a queue of optimistic guesses. Pick whichever process is closest to being satisfiable, simulate letting it finish, and see if that frees up enough room for the next one. It's the same instinct as paying off your smallest debt first to free up cash flow for the next.</p>

      <h2>A worked example</h2>
      <p>Say we have three resource types A, B, C with 10, 5, and 7 instances respectively, and four processes. Once Allocation and Max are filled in, Need falls out automatically. Available starts as the leftover after current allocations. Walking through the safety check by hand — even just once — does more for retention than re-reading the textbook's version twice.</p>

      <h2>Exam tip</h2>
      <p>Markers tend to award partial credit generously if your matrices are correct even if your final safe sequence is wrong. Show every intermediate Available vector, not just the final answer.</p>
    `
  },

  "css-design-system": {
    title: "Building a CSS design system from scratch",
    topic: "Web Development",
    date: "June 10, 2026",
    readTime: "6 min read",
    cover: "../images/blog/post-2.svg",
    tags: ["CSS", "Design Systems", "Frontend"],
    body: `
      <p>When I started building this site, my first instinct was to start writing styles page by page. Three pages in, I had four shades of off-white and two different "primary" colors fighting each other. Here's the structure that fixed it.</p>

      <h2>Start with tokens, not components</h2>
      <p>A design token file — colors, spacing, type scale, radii — sounds like overhead until you need to change one accent color and realize it's hardcoded in fourteen places. Defining everything as CSS custom properties up front meant every later decision referenced a single source of truth.</p>

      <h2>Separate structure from skin</h2>
      <p>I split the stylesheets into <code>base</code> (resets and typography), <code>layout</code> (header, footer, grids), and <code>components</code> (buttons, cards, modals). Pages then layer a small page-specific file on top for anything truly one-off, like the hero section.</p>

      <h2>Name things by what they are, not what they look like</h2>
      <p>A class called <code>.rust-button</code> breaks the moment you want a teal version. Naming it <code>.btn--primary</code> instead means swapping the accent color later doesn't require a find-and-replace across every HTML file.</p>

      <h2>Specificity traps to avoid</h2>
      <p>The easiest way to fight your own CSS is mixing element selectors with class selectors at the same specificity level — a <code>.section</code> rule and an <code>.cta</code> rule that both set margin can silently cancel out depending on source order. Sticking to single class selectors almost everywhere keeps the override order predictable.</p>

      <h2>What I'd do differently</h2>
      <p>I'd define the spacing scale before writing a single component, rather than backfilling it halfway through. Retrofitting consistent spacing onto already-written markup is far more tedious than starting with the scale.</p>
    `
  },

  "process-synchronization": {
    title: "Process synchronization without losing your mind",
    topic: "Operating Systems",
    date: "May 29, 2026",
    readTime: "7 min read",
    cover: "../images/blog/post-3.svg",
    tags: ["Operating Systems", "Concurrency", "CSE 3203"],
    body: `
      <p>Race conditions are the chapter where the textbook's code samples stop being intuitive and start requiring you to trace through interleavings by hand. Here's the mental model that finally made it stick.</p>

      <h2>The core problem</h2>
      <p>When two or more processes access shared data concurrently, and at least one of them writes to it, the final result can depend on the exact timing of execution. That's a race condition. The fix is ensuring that only one process can be inside a <strong>critical section</strong> — the part of the code that touches shared data — at a time.</p>

      <h2>Semaphores as traffic lights</h2>
      <p>A semaphore is just a counter with two atomic operations: <code>wait()</code> decrements it (and blocks if it would go negative), and <code>signal()</code> increments it. Picture a single-lane bridge with one traffic light. A binary semaphore initialized to 1 is exactly that bridge: one car (process) crosses at a time, and the next car waits at the light until the previous one signals it's clear.</p>

      <h2>Mutex vs. semaphore</h2>
      <p>A mutex is a semaphore restricted to values 0 and 1, used purely for mutual exclusion. A counting semaphore generalizes this to manage a pool of identical resources — think of a parking lot with five spaces instead of a single-lane bridge.</p>

      <h2>The classic producer-consumer setup</h2>
      <p>Two semaphores do the job: one tracking empty slots in a shared buffer, one tracking filled slots, plus a mutex protecting the buffer itself. Producers wait on "empty," consumers wait on "full," and both signal back after they're done — a clean illustration of how semaphores coordinate, not just exclude.</p>

      <h2>Where students usually slip up</h2>
      <p>Forgetting to release a lock on every exit path of a function — including early returns inside conditionals — is the most common bug in synchronization assignments. Tracing every branch by hand before submitting saved me more than once.</p>
    `
  },

  "exam-study-plan": {
    title: "Surviving CSE 3203: a study plan that actually worked",
    topic: "Academics",
    date: "May 20, 2026",
    readTime: "5 min read",
    cover: "../images/blog/post-4.svg",
    tags: ["Academics", "Study Tips", "Operating Systems"],
    body: `
      <p>Two weeks before the final, I had the entire Silberschatz and Galvin syllabus in front of me and no idea where to start. This is the plan that got me through it without an all-nighter the night before.</p>

      <h2>Week one: map, don't memorize</h2>
      <p>I spent the first three days just listing every topic the course covered — processes, scheduling, synchronization, deadlock, memory management, paging — and rating my own confidence in each from 1 to 5. The goal wasn't to study yet, it was to know exactly where the gaps were.</p>

      <h2>Attack the lowest-confidence topics first</h2>
      <p>It's tempting to start with what you already know because it feels productive. I forced myself to start with deadlock and the Banker's Algorithm instead, since that's where my confidence was lowest, while motivation was still high.</p>

      <h2>Past papers over re-reading</h2>
      <p>Re-reading a chapter feels like progress but rarely tests recall. Working through two or three past exam papers per topic, even badly at first, exposed exactly which question patterns kept showing up — safe-state checks, Gantt chart scheduling problems, page-fault counting exercises.</p>

      <h2>Week two: timed practice</h2>
      <p>In the second week I simulated exam conditions: closed book, a timer, one full past paper at a time. The first attempt was rough, but by the third I'd stopped second-guessing the matrix setup for Banker's Algorithm questions entirely.</p>

      <h2>The night before</h2>
      <p>No new material. Just a single pass through my own summary sheet and an early night. The marginal gain from cramming one more topic is rarely worth the sleep debt going into a multi-hour exam.</p>
    `
  },

  "flexbox-vs-grid": {
    title: "Responsive layouts: Flexbox vs. Grid, picked properly",
    topic: "Web Development",
    date: "May 12, 2026",
    readTime: "6 min read",
    cover: "../images/blog/post-5.svg",
    tags: ["CSS", "Responsive Design", "Frontend"],
    body: `
      <p>Both Flexbox and Grid solve layout, and both can technically build most things you'd want. The question that actually matters is which one matches the structure of your content.</p>

      <h2>The one-dimensional vs. two-dimensional rule</h2>
      <p>Flexbox is built for laying items out along a single axis — a row of nav links, a stack of card content. Grid is built for controlling rows and columns simultaneously. The moment you find yourself nesting flex containers just to align something both horizontally and vertically, that's usually Grid's job instead.</p>

      <h2>Where Flexbox wins</h2>
      <p>Navigation bars, button groups, and any layout where items should wrap naturally and size to their content. The <code>gap</code> property combined with <code>flex-wrap</code> replaced what used to be a small pile of margin hacks.</p>

      <h2>Where Grid wins</h2>
      <p>Card grids — like the blog and project listings on this very site — are Grid's textbook use case: a fixed number of columns that need to collapse predictably at each breakpoint. <code>grid-template-columns: repeat(3, 1fr)</code> at desktop, dropping to <code>repeat(2, 1fr)</code> and then <code>1fr</code> on smaller screens, took three lines total.</p>

      <h2>They compose, they don't compete</h2>
      <p>The most common real layout is Grid for the page-level structure and Flexbox inside individual grid cells for aligning their contents. Treating them as alternatives to debate misses that they're usually used together.</p>

      <h2>A practical default</h2>
      <p>If I'm laying out a single row or column of items: Flexbox. If I'm laying out a grid of cards or a page skeleton with named regions: Grid. That one rule resolved 90% of the "which one do I use here" hesitation.</p>
    `
  },

  "virtual-memory-paging": {
    title: "Virtual memory and paging, explained with a bookshelf",
    topic: "Operating Systems",
    date: "April 30, 2026",
    readTime: "7 min read",
    cover: "../images/blog/post-6.svg",
    tags: ["Operating Systems", "Memory Management", "CSE 3203"],
    body: `
      <p>Paging is one of those topics where the diagrams in the textbook are correct but somehow still don't explain <em>why</em> any of this is necessary. Here's the version with a bookshelf instead of a page table.</p>

      <h2>The problem paging solves</h2>
      <p>Programs are written as if they have access to a huge, contiguous block of memory starting at address zero. In reality, physical memory is shared across many programs and is rarely contiguous in the way any single program needs. Paging is the translation layer that makes the illusion work.</p>

      <h2>Pages and frames</h2>
      <p>Logical memory is divided into fixed-size <strong>pages</strong>; physical memory into fixed-size <strong>frames</strong> of the same size. A page table maps each page to whichever frame currently holds it — pages don't need to be stored in order, or even stay in the same frame for the program's entire lifetime.</p>

      <h2>The bookshelf analogy</h2>
      <p>Imagine a book (the program) cut into chapters of equal length (pages). Those chapters get distributed across several different bookshelves around a library (physical frames), in no particular order. A librarian's index card (the page table) tells you exactly which shelf and slot holds chapter 7. You don't need the chapters in order on the shelves — you just need an accurate index.</p>

      <h2>Why the TLB exists</h2>
      <p>Looking up the index card every single time you want a chapter is slow if the index itself lives far away. A Translation Lookaside Buffer is a small, fast cache of recent index lookups — keeping a few sticky notes of "chapter 7 is on shelf 3" right at your desk instead of walking to the index every time.</p>

      <h2>Page faults</h2>
      <p>If the chapter you want isn't on any shelf right now — it's still in storage — that's a page fault. The OS has to fetch it, possibly evicting another chapter to make room, before your program can continue. This is also exactly why thrashing happens when too many programs compete for too few frames: everyone's constantly swapping chapters in and out and nobody gets to actually read.</p>
    `
  }

};
