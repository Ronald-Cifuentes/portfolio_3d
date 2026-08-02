# SOLID PRINCIPLES

### **S — SRP (Single Responsibility Principle):** a unit should have **one relevant reason to change**.

1. **Separation of Concerns:** separate distinct concerns.
2. **High Cohesion:** keep together the things that change for the same reason.
3. **Low Coupling:** minimize unnecessary dependencies between responsibilities.
4. **Encapsulation:** hide internal details behind a clear responsibility.
5. **Information Hiding:** expose only what other components need to know.
6. **Feature Decomposition:** organize code around capabilities/responsibilities.
7. **Avoid God Objects:** prevent components from controlling too many responsibilities.
8. **Change Locality:** a conceptual change should affect the fewest possible places.
9. **Clear Ownership:** every behavior should have an identifiable owner.

---

### **O — OCP (Open/Closed Principle):** allow new variants through **extension**, avoiding continuous modification of stable code.

1. **Abstraction:** separate contract from implementation.
2. **Polymorphism:** allow multiple behaviors under the same contract.
3. **Encapsulate What Varies:** isolate what is likely to change.
4. **Composition:** add behavior by combining components.
5. **Stable Abstractions:** make central interfaces stable.
6. **Stable Core / Flexible Edges:** stable core, replaceable periphery.
7. **Avoid Type Checking:** reduce central `if/when` constructs that need to know all
   implementations.
8. **Protected Variations:** protect the system from foreseeable points of variation.

---

### **L — LSP (Liskov Substitution Principle):** any subtype must be able to replace its base type **without invalidating the contract or changing the consumer's expectations**.

1. **Behavioral Subtyping:** the relationship between types is behavioral, not merely syntactic.
2. **Contract Preservation:** respect the base type's contract.
3. **Preserve Invariants:** maintain the conditions that must always hold.
4. **No Stronger Preconditions:** the subtype cannot require more from the consumer.
5. **No Weaker Postconditions:** the subtype cannot promise less.
6. **Exception Compatibility:** do not introduce failures incompatible with the expected contract.
7. **Semantic Consistency:** an operation must preserve its meaning.
8. **Predictable Polymorphism:** the consumer should not need to know the concrete implementation.
9. **Avoid Unsupported Operations:** an implementation should not implement operations it cannot
   actually fulfill.
10. **Composition over Wrong Inheritance:** use composition when the `is-a` relationship is not
    true.

---

### **I — ISP (Interface Segregation Principle):** no consumer should depend on operations it **does not need**.

1. **Small Interfaces:** small contracts.
2. **Focused Interfaces:** one coherent capability per interface.
3. **Role Interfaces:** contracts defined according to roles.
4. **Client-specific Interfaces:** interfaces designed according to the consumer's actual needs.
5. **Capability Interfaces:** represent independent capabilities.
6. **Interface Composition:** build larger contracts by combining smaller contracts.
7. **Avoid Fat Interfaces:** avoid gigantic interfaces.
8. **Reduced Compile-time Coupling:** irrelevant changes should not propagate.
9. **Reduced Change Propagation:** modifying one capability does not affect unrelated consumers.
10. **Better Testability:** small contracts allow simpler fakes/stubs.

---

### **D — DIP (Dependency Inversion Principle):** system policy must not depend on details; **details must depend on abstractions defined around the policy**.

1. **Dependency Injection:** provide dependencies from the outside.
2. **Inversion of Control:** the component does not necessarily control the creation of its
   dependencies.
3. **Programming to Abstractions:** depend on contracts.
4. **Dependency Rule:** architectural dependencies point toward the more stable layers.
5. **Framework Independence:** frameworks as replaceable details.
6. **Database Independence:** persistence as a detail.
7. **UI Independence:** UI as an adapter, not the owner of the domain.
8. **Replaceable Infrastructure:** be able to replace network, DB, filesystem, APIs, etc.
9. **Constructor Injection:** visible and mandatory dependencies.
10. **Dependency Composition Root:** assemble concrete implementations at an external point.
11. **Test Doubles:** replace infrastructure for testing.

---

# Complementary principles

1. **DRY — Don't Repeat Yourself:** the same decision/knowledge should not be duplicated in multiple
   places.
2. **KISS — Keep It Simple:** do not introduce complexity without demonstrated need.
3. **YAGNI — You Aren't Gonna Need It:** do not build hypothetical extensibility before needing it.
4. **Composition over Inheritance:** prefer composition when inheritance creates coupling or false
   relationships.
5. **Law of Demeter:** a component should know as little as possible about the internal structure of
   other components.
6. **Tell, Don't Ask:** ask an object to perform a responsibility instead of extracting its data to
   do it externally.
7. **Information Hiding:** hide decisions that are likely to change.
8. **Encapsulation:** protect state and invariants behind an API.
9. **Principle of Least Knowledge:** reduce structural knowledge between components.
10. **Principle of Least Astonishment:** APIs should behave as their users reasonably expect.
11. **Fail Fast:** detect invalid states as early as possible.
12. **Explicit Dependencies:** dependencies should be visible in the component's API.
13. **Immutability by Default:** favor immutable state unless mutation is needed.
14. **Command–Query Separation:** an operation should either modify state or return information,
    avoiding mixing both without need.
15. **Single Source of Truth:** every authoritative piece of data/state should have a clearly
    defined source.
16. **Dependency Direction:** dependencies should point from volatile details toward stable
    policies, not the other way around.
17. **Acyclic Dependencies:** avoid cycles between modules/components.
18. **Package/Module Cohesion:** things that change together should be deployed or grouped together.
19. **Package/Module Coupling:** minimize dependencies between modules.
20. **Locality of Behaviour:** keep behavior close to the state/concept it belongs to.

---

# 0. ARCHITECTURE META-PRINCIPLES

1. **Architecture Is About Significant Decisions:** architecture should focus on structural
   decisions that are costly to change, not trivial preferences.
2. **Architecture Follows Requirements and Constraints:** no architecture is good in the abstract;
   it must respond to objectives, constraints, and quality attributes.
3. **Trade-offs Are Inevitable:** optimizing one property often affects others; documenting the
   trade-off is part of the decision.
4. **No Silver Bullet:** no technology, pattern, or architecture eliminates the problem's essential
   complexity by itself.
5. **Context over Dogma:** apply principles according to context, evidence, and cost; do not turn
   them into rituals.
6. **Evidence over Fashion:** prefer decisions supported by measurement, experiments, known limits,
   and product needs.
7. **Make Constraints Explicit:** technical, legal, economic, and organizational constraints must be
   visible.
8. **Optimize for Change:** design boundaries around things that change for different reasons.
9. **Reversibility:** favor decisions that are easy to reverse when uncertainty is high.
10. **Irreversible Decisions Require More Evidence:** the greater the cost of reversal, the greater
    the required level of validation.
11. **Architecture Must Be Observable:** an operational property that cannot be measured or verified
    is difficult to govern.
12. **Architecture Must Be Testable:** relevant structural decisions must be verifiable through
    tests, analysis, or fitness functions.
13. **Architecture Is Continuous:** architecture evolves with the system; it does not end with an
    initial diagram.
14. **Architecture Has Owners:** architectural decisions and boundaries need explicit owners.
15. **Decision Traceability:** it must be possible to trace what decision was made, why, under what
    context, and with what consequences.
16. **Fitness for Purpose:** evaluate architecture by its ability to fulfill the system's real
    purpose.
17. **Simplicity Is a Constraint:** every additional layer, service, framework, or mechanism must
    justify its cost.
18. **Complexity Budget:** treat accidental complexity as a limited resource.
19. **Prefer Mechanisms That Preserve Options:** under uncertainty, avoid unnecessarily closing off
    future paths.
20. **Local Reasoning:** a part of the system should be understandable and modifiable with the least
    possible global knowledge.

---

# 1. GRASP PRINCIPLES — COMPLETE DEVELOPMENT

1. **Information Expert:** assign a responsibility to the object or component that possesses the
   information needed to fulfill it.
2. **Creator:** assign object creation to whoever contains, aggregates, records, closely uses, or
   owns its initialization data.
3. **Controller:** receive system events in an object representing the system, subsystem, use case,
   or session, avoiding burdening the UI with application logic.
4. **Low Coupling:** minimize dependencies to reduce change propagation and facilitate replacement,
   testing, and evolution.
5. **High Cohesion:** concentrate strongly related responsibilities and avoid conceptually scattered
   components.
6. **Polymorphism:** assign behavioral variations to polymorphic types instead of central
   conditionals over types.
7. **Pure Fabrication:** create an artificial component when no domain entity is an appropriate
   place and doing so improves cohesion or decoupling.
8. **Indirection:** introduce an intermediary when needed to decouple two elements or mediate a
   variation.
9. **Protected Variations:** identify foreseeable points of change and protect their consumers
   through stable interfaces or boundaries.

---

# 2. ROBERT C. MARTIN'S COMPONENT AND PACKAGE PRINCIPLES

2. **CCP — Common Closure Principle:** group in the same component classes that tend to change for
   the same reasons and at the same time.
3. **CRP — Common Reuse Principle:** do not force dependency on elements the consumer does not need;
   things reused together should be grouped together.
4. **ADP — Acyclic Dependencies Principle:** the dependency graph between components must remain
   acyclic.
5. **SDP — Stable Dependencies Principle:** dependencies should point toward more stable components.
6. **Dependency Cycles Are Architectural Debt:** a cycle causes multiple modules to behave as a
   single unit of change.
7. **Versioned Boundaries:** a reused or distributed boundary needs an explicit compatibility and
   versioning policy.

---

# 3. GENERAL DESIGN AND MODULARITY PRINCIPLES

1. **Abstraction:** model what is essential and hide details irrelevant to the consumer.
2. **Encapsulation:** control access to state and behavior to protect invariants.
3. **Information Hiding:** hide design decisions that are likely to change.
4. **Separation of Policy and Mechanism:** separate what must be done from how it is executed.
5. **Orthogonality:** minimize cross-effects between conceptually independent parts.
6. **High Cohesion:** maximize the internal relationship between a module's responsibilities.
7. **Low Coupling:** minimize knowledge and dependency between modules.
8. **Explicit over Implicit:** make important dependencies, states, effects, and contracts visible.
9. **Convention over Configuration:** use safe conventions to reduce repetitive configuration
   without hiding critical decisions.
10. **Principle of Least Power:** choose the least powerful language or mechanism that sufficiently
    solves the problem when doing so reduces complexity and risk.
11. **Design by Contract:** define observable preconditions, postconditions, and invariants.
12. **Make Illegal States Unrepresentable:** model types and structures to prevent invalid states
    when feasible.
13. **Parse, Don't Validate:** convert untrusted input into typed/validated structures at the
    boundary instead of carrying ambiguous data.
14. **Functional Core, Imperative Shell:** isolate pure rules from external effects when this
    improves reasoning and testability.
15. **Side Effects at the Edges:** keep IO, time, randomness, network, and mutations away from the
    core when feasible.
16. **Rule of Three:** avoid premature generalizations; abstract when there is sufficient repeated
    evidence.
17. **Prefer Boring Technology:** choose known technology when novelty provides no demonstrated
    advantage.
18. **Minimize Surface Area:** expose the smallest public API necessary.
19. **Hide Volatility:** encapsulate the elements most likely to change.
20. **Locality of Change:** a conceptual change should remain confined to a few units.
21. **Uniformity Where It Reduces Cognitive Load:** use consistent patterns for equivalent problems.
22. **Variation Where Context Requires It:** do not impose uniformity if different constraints
    require different solutions.
23. **No Spooky Action at a Distance:** a local modification should not produce unexpected remote
    effects.
24. **Explicit Resource Ownership:** every mutable or external resource must have a clear owner and
    lifecycle.
25. **Bound Resource Usage:** memory, threads, connections, queues, and storage must have limits.
26. **Prefer Total Functions:** when reasonable, design operations defined for every valid value in
    their domain.
27. **Determinism Where Possible:** reduce sources of nondeterminism that make testing,
    reproduction, and operation harder.
28. **Idempotence Where Repetition Is Plausible:** design repeatable operations without additional
    effects when they may be retried.
29. **Avoid Temporal Coupling:** avoid APIs that work only if the consumer knows a hidden sequence
    of calls.
30. **Avoid Shotgun Surgery:** structure the system so that a conceptual modification does not
    require editing numerous disconnected places.

---

# 4. BOUNDARIES, MODULES, AND BOUNDED CONTEXT PRINCIPLES

1. **Bounded Context:** a model and its language must have consistent meaning within an explicit
   boundary.
2. **Ubiquitous Language:** names in code and conversations should reflect the domain's shared
   language within the context.
3. **Module Isolation:** a module must not expose unnecessary internal details.
4. **Dependency Boundaries:** every dependency between modules must cross deliberate contracts.
5. **Vertical Slicing:** group end-to-end functionality by capability/use case when this reduces
   horizontal coupling.
6. **Feature Encapsulation:** a feature should own its behavior, state, and relevant adapters.
7. **Independent Evolvability:** a useful boundary allows one part to change without understanding
   or deploying the entire system.
8. **Explicit Integration Contracts:** relationships between contexts must have visible contracts.
9. **Anti-Corruption Layer:** translate external models when incorporating them directly would
   contaminate the internal model.
10. **Published Language:** share clearly defined integration formats when multiple contexts need to
    interoperate.
11. **Shared Kernel Sparingly:** share part of the model only with explicit coordination and
    accepted cost.
12. **Context Mapping:** document dependency and power relationships between contexts.
13. **No Cross-Boundary Database Reach-Through:** prevent one module from directly manipulating
    another module's private data.
14. **Ownership Follows Boundary:** code, data, contracts, and decisions should have owners
    consistent with the boundary.
15. **Boundary by Rate of Change:** separate elements that evolve at different rates or for
    different reasons.
16. **Boundary by Security/Compliance:** use boundaries when security, privacy, or regulatory
    requirements differ.

---

# 5. DOMAIN-DRIVEN DESIGN (DDD) PRINCIPLES

1. **Domain First:** central decisions must model the business problem, not framework limitations.
2. **Strategic Design before Tactical Patterns:** define contexts and relationships before applying
   entities, aggregates, or repositories.
3. **Invariant Ownership:** every rule must have a responsible place that enforces it.
4. **Model Distillation:** identify the core domain and reduce noise around it.
5. **Core Domain Investment:** dedicate greater quality and talent to the capabilities that truly
   differentiate the business.
6. **Generic Subdomains May Be Bought/Reused:** do not reinvent capabilities that do not
   differentiate the business.
7. **Continuous Model Refinement:** the model must evolve as understanding of the domain improves.

---

# 6. DEPENDENCY DIRECTION AND ARCHITECTURAL STYLE PRINCIPLES

1. **Dependency Rule:** source-code dependencies must point toward more stable/central policies.
2. **Don't Skip Layers Accidentally:** any bypass of a boundary must be deliberate, not an informal
   shortcut.
3. **Framework as Detail:** adapt the framework to the system, not the domain to fit the framework.
4. **Database as Detail:** the business model should not be an accidental mirror of the physical
   schema.
5. **Transport as Detail:** HTTP, GraphQL, gRPC, queues, or other protocols should not define
   business rules.
6. **Composition Root:** assemble concrete implementations at a controlled edge.
7. **Dependency Injection over Service Locator:** make dependencies explicit when this preserves
   understanding and testability.
8. **Stable Contracts, Replaceable Implementations:** consumers depend on stable semantics, not
   concrete details.

---

# 7. DATA, STATE, AND PERSISTENCE PRINCIPLES

1. **Single Source of Truth:** for every authoritative fact there must be a clearly defined source
   of truth.
2. **State Ownership:** every mutable state needs an owner responsible for modifying it.
3. **Unidirectional Data Flow:** favor a predictable flow of state → UI/output and events → state
   update.
4. **Derived State:** do not store as authoritative what can be reliably derived from another
   source.
5. **Normalize to Remove Update Anomalies:** in relational models, normalize when it reduces
   redundancy and anomalies.
6. **Denormalize Deliberately:** duplicate data only for an explicit reading, performance, or
   availability purpose and with a synchronization strategy.
7. **Schema Is a Contract:** schema changes must address compatibility, migration, and consumers.
8. **Data Has a Lifecycle:** creation, use, retention, archiving, and deletion must be designed.
9. **Data Minimization:** retain only data necessary for a legitimate purpose.
10. **Data Ownership:** assign responsibility for quality, security, access, and evolution.
11. **Data Locality:** place data close to computation when this reduces latency/cost without
    violating other constraints.
12. **Transactional Boundary Matches Invariant Boundary:** a transaction must encompass the
    consistency that truly needs to be atomic.
13. **Migration Compatibility Window:** during gradual deployments, old and new schemas may need to
    coexist.
14. **Expand-and-Contract:** add compatibility first, migrate consumers/data, and remove the old
    afterward.

---

# 8. DISTRIBUTED SYSTEMS PRINCIPLES, LAWS, AND LIMITS

5. **Network Is Not Reliable:** design assuming loss, duplicates, delays, reordering, and
   partitions.
6. **Latency Is Not Zero:** every network boundary adds latency and variability.
7. **Bandwidth Is Not Infinite:** message size, frequency, and compression matter.
8. **Topology Changes:** nodes, routes, regions, and dependencies change.
9. **Transport Cost Is Not Zero:** networking consumes money, energy, and capacity.
10. **The Network Is Not Homogeneous:** protocols, versions, capabilities, and failures vary.
11. **Partial Failure Is Normal:** one part may fail while another continues.
12. **Timeouts Are Semantic Decisions:** choosing a timeout determines when the system stops
    waiting; it does not prove the operation did not occur.
13. **Retries Can Duplicate Effects:** every retry must consider idempotency or deduplication.
14. **Clocks Are Not Perfect:** physical clocks can drift; do not infer causality solely from
    timestamps.
15. **End-to-End Argument:** certain functions, such as complete integrity or reliability, can only
    be guaranteed correctly at the endpoints even if lower layers help.
16. **Failure Detection Is Suspicion:** in an asynchronous network, a timeout cannot reliably
    distinguish a failed node from a slow/isolated node.

---

# 10. CONCURRENCY AND PARALLELISM PRINCIPLES

1. **Structured Concurrency:** concurrent tasks must live within scopes with a clear lifecycle.
2. **Cancellation Propagation:** parent cancellation must propagate according to defined semantics
   and not leave orphaned work.
3. **Scope Ownership:** whoever creates an execution scope is responsible for its completion.
4. **Avoid Shared Mutable State:** prefer isolation, immutability, or message passing.
5. **Synchronization Must Protect an Invariant:** every lock/atomic must correspond to a concrete
   rule.
6. **Minimize Critical Sections:** hold a lock only during work that requires exclusion.
7. **Avoid Lock Ordering Ambiguity:** establish an order for multiple locks to reduce deadlocks.
8. **Do Not Block Event Loops:** blocking work must run outside loops/dispatchers intended for
   non-blocking tasks.
9. **Cooperative Cancellation:** long-running code must provide cancellation points when required by
   the runtime.
10. **Concurrency Is Not Parallelism:** model concurrent tasks and parallel execution as distinct
    concepts.
11. **Parallelize Independent Work:** execute in parallel only work without a necessary causal
    dependency.
12. **Bound Parallelism:** limit fan-out and the number of simultaneous tasks.
13. **Backpressure over Unbounded Producers:** do not produce work faster than the system can absorb
    indefinitely.
14. **Race Freedom:** synchronize all concurrent reads/writes that may violate invariants.
15. **Atomicity at the Right Level:** an operation must be atomic with respect to the invariants it
    promises.
16. **Avoid Check-Then-Act Races:** combine checking and modification atomically when actors
    compete.
17. **Actor/Ownership Isolation:** assign mutable state to a single owner when this makes reasoning
    easier.
18. **Thread Confinement:** keep mutable state restricted to a thread/dispatcher when appropriate.
19. **Immutability for Sharing:** share immutable values instead of mutable memory whenever
    practical.
20. **Deterministic Concurrency Tests:** control schedulers/clocks where possible to test race
    conditions.

## Kotlin/Coroutines

21. **Coroutine Lifetime Follows Owner Lifetime:** a coroutine must not accidentally outlive the
    component that needs it.
22. **Never Use GlobalScope as Default Ownership:** global scopes require justification because they
    break structured lifetime.
23. **Cancellation Is Normal Control Flow:** do not treat `CancellationException` as an ordinary
    business error.
24. **Do Not Swallow Cancellation:** propagate cancellation unless an explicit design justifies
    otherwise.
25. **Dispatcher Is a Resource Policy:** choose a dispatcher according to CPU/IO nature and avoid
    hardcoding it when that harms testability.
26. **StateFlow/Flow Has Ownership:** define who produces, transforms, shares, and cancels each
    flow.
27. **Cold vs Hot Stream Semantics Must Be Intentional:** consciously decide whether each subscriber
    triggers work or shares a source.
28. **Shared Mutable State Requires a Strategy:** mutex, atomics, actor/confinement, or immutable
    state; never merely “hope” there is no race.

---

# 11. RESILIENCE AND RELIABILITY PRINCIPLES

1. **Design for Failure:** assume components and dependencies will fail.
2. **Fail Fast:** detect impossibility quickly when waiting adds no value.
3. **Fail Safe:** on failure, preserve a safe state.
4. **Fail Closed:** in security controls, deny by default when authorization cannot be verified.
5. **Graceful Degradation:** preserve essential functions when secondary functions fail.
6. **Bulkhead:** isolate resources and failures so saturation does not bring down everything.
7. **Circuit Breaker:** temporarily stop invoking a degraded dependency and test recovery in a
   controlled way.
8. **Timeout:** bound the wait for every remote or potentially blocking operation.
9. **Retry with Backoff:** space retries so they do not amplify failures.
10. **Jitter:** introduce randomness into retries to avoid mass synchronization.
11. **Retry Only Safe Operations:** verify idempotency and the nature of the error before retrying.
12. **Retry Budget:** limit total retries to avoid retry storms.
13. **Fault Isolation:** contain failures within the smallest possible boundary.
14. **Recovery Is a Feature:** restart, reprocessing, restoration, and reconciliation must be
    designed.
15. **Fallbacks Must Be Correct:** do not silently return incorrect data merely to “keep working.”
16. **Stale Data Requires Explicit Semantics:** if stale cache is served, the contract must allow
    it.
17. **Dependency Failure Policy:** every dependency needs a timeout, retry, fallback, isolation, and
    observation policy.
18. **Recovery over Prevention Alone:** accept that no system prevents every failure and design
    recovery.

---

# 12. PERFORMANCE, SCALABILITY, AND CAPACITY PRINCIPLES

1. **Measure Before Optimizing:** optimize based on profiles and metrics, not intuition.
2. **Optimize the Critical Path:** prioritize what dominates real latency/cost.
3. **Amdahl's Law:** maximum speedup is limited by the fraction that cannot be
   parallelized/improved.
4. **Tail Latency Matters:** high percentiles can dominate experience and distributed fan-out.
5. **Avoid Unbounded Work per Request:** limit the number of rows, objects, messages, and operations
   processed per request.
6. **Pagination:** divide large collections with clear continuation semantics.
7. **Streaming:** process data incrementally when this avoids buffers and unnecessary latency.
8. **Batching:** group operations when this reduces overhead without violating required latency.
9. **Caching Is a Consistency Trade-off:** every cache must define invalidation, freshness, and
   authority.
10. **Cache What Is Expensive and Reusable:** do not cache reflexively.
11. **Backpressure Protects Throughput:** sustainable performance requires controlling pressure.
12. **Performance Budget:** establish quantifiable limits per layer/operation.
13. **Latency Budget:** allocate maximum end-to-end time across components.
14. **Memory Budget:** limit memory per operation, user, process, and cache.
15. **Connection Budget:** treat sockets, DB connections, and threads as finite resources.
16. **Avoid N+1 Access Patterns:** batch/preload when repeated accesses dominate cost.
17. **Move Less Data:** reducing unnecessary transfer is often more effective than processing it
    faster.
18. **Compute Near Data When Appropriate:** move computation closer to data when this reduces
    movement without harming isolation.
19. **Precompute Deliberately:** use materialization when reads justify it and an update strategy
    exists.
20. **Benchmark Representative Workloads:** microbenchmarks do not replace real workloads.
21. **Performance Regression Testing:** protect critical budgets in CI/observability.

---

# 13. API AND PROTOCOL DESIGN PRINCIPLES

1. **Contract First Thinking:** define semantics and obligations before implementation details.
2. **Minimal Surface Area:** expose only necessary operations/fields.
3. **Consistency:** equivalent problems should use equivalent conventions.
4. **Explicitness:** avoid hidden behavior that changes results.
5. **Least Astonishment:** names, defaults, and errors should match reasonable expectations.
6. **Backward Compatibility:** existing consumers must not break during compatible evolution.
7. **Forwards Tolerance Where Safe:** consumers may ignore unknown extensions when the protocol
   allows it.
8. **Version Only When Semantics Require It:** do not version every additive change.
9. **Prefer Additive Evolution:** add before renaming/removing when external consumers exist.
10. **Deprecate before Remove:** provide a migration window and telemetry.
11. **Idempotency:** potentially retried operations should support an idempotency key/semantics.
12. **Explicit Error Model:** errors must be structured, classifiable, and actionable.
13. **Stable Identifiers:** public IDs should not depend on fragile internal details.
14. **Opaque Identifiers:** consumers should not infer semantics from an ID unless explicitly
    contracted.
15. **Pagination Is Contractual:** order, cursor, and page consistency must be defined.
16. **Filtering/Sorting Semantics Are Explicit:** avoid ambiguous interpretations.
17. **Partial Update Semantics Are Explicit:** distinguish omission, `null`, deletion, and
    preservation.
18. **Validation at the Boundary:** reject invalid inputs before they contaminate the core.
19. **Canonical Representation:** define canonical formats when signing, caching, or comparison
    depends on them.
20. **Content Negotiation Deliberately:** negotiated formats/versions must be observable and
    testable.
21. **No Leaking Internal Exceptions:** translate internal failures into a stable public contract.
22. **Rate Limits Are Part of the Contract:** document limits and signaling when they affect
    consumers.
23. **Timeout/Async Semantics Are Part of the Contract:** long operations require an explicit model.
24. **Request Correlation:** allow calls to be traced end to end.
25. **Schema Evolution Rules:** formalize which changes are compatible.
26. **Consumer-Driven Compatibility:** test contracts against actual consumer needs when
    appropriate.
27. **Security by Default:** authentication/authorization and minimal exposure are designed from the
    contract.
28. **Privacy by Default:** do not expose sensitive fields merely because “they already exist.”
29. **Semantic Naming:** names describe domain concepts, not tables or accidental details.
30. **Document Examples and Edge Cases:** examples are a practical part of a usable API, but they do
    not replace specification.

---

# 15. SECURITY PRINCIPLES

## Saltzer and Schroeder

1. **Economy of Mechanism:** keep security mechanisms small and simple.
2. **Fail-Safe Defaults:** base access on explicit permission, not on excluding what is forbidden.
3. **Open Design:** security must not depend on keeping the design or algorithm secret.
4. **Least Privilege:** grant only the privileges needed, for only as long as needed.
5. **Psychological Acceptability:** controls must be usable so users do not bypass them.

## Modern principles

9. **Secure by Design:** incorporate security into architecture and lifecycle, not as a final patch.
10. **Secure by Default:** initial configurations must minimize exposure.
11. **Defense in Depth:** use independent layers of control in case one defense fails.
12. **Assume Breach:** design containment and detection assuming some defense may be overcome.
13. **Minimize Attack Surface:** reduce exposed endpoints, ports, dependencies, permissions, and
    functionality.
14. **Secrets Are Not Configuration Values to Commit:** store and rotate secrets through dedicated
    mechanisms.
15. **Credential Rotation:** reduce the useful lifetime of compromised credentials.
16. **Short-Lived Credentials:** prefer ephemeral tokens/credentials when possible.
17. **No Plaintext Sensitive Data in Logs:** redact/tokenize before observability.
18. **Encryption in Transit:** protect data on untrusted networks and between services according to
    the threat model.
19. **Encryption at Rest:** protect storage according to sensitivity and threats.
20. **Key Separation:** separate keys by purpose/environment/tenant when the risk justifies it.
21. **Key Management Is Architecture:** generation, storage, access, rotation, and destruction are
    part of the design.
22. **Input Is Untrusted at Trust Boundaries:** validate syntax, size, type, and semantics.
23. **Authentication Is Not Authorization:** valid identity does not imply permission.
24. **Dependency/Supply-Chain Security:** verify provenance, integrity, and vulnerabilities of
    dependencies and builds.
25. **Reproducible/Traceable Builds:** be able to relate a binary to its source, dependencies, and
    build process.
26. **Patchability:** design mechanisms to update vulnerable components.
27. **Vulnerability Disclosure/Response:** have a process to receive, prioritize, and fix
    vulnerabilities.
28. **Threat Modeling:** identify assets, actors, boundaries, threats, and mitigations before and
    during evolution.
29. **Security Requirements Are Testable:** critical controls should be automatically verifiable
    where possible.

---

# 16. PRIVACY PRINCIPLES

## Privacy by Design — seven principles

1. **Proactive not Reactive; Preventative not Remedial:** anticipate privacy risks before incidents.
2. **Privacy as the Default Setting:** protect data without requiring additional user actions.
3. **Privacy Embedded into Design:** integrate privacy into architecture and processes.
4. **Full Functionality — Positive-Sum, not Zero-Sum:** seek solutions that satisfy privacy and
   legitimate objectives without false dilemmas.
5. **End-to-End Security — Full Lifecycle Protection:** protect data from collection through
   deletion.
6. **Visibility and Transparency:** enable verification and accountability.
7. **Respect for User Privacy:** center design on user interests and controls.

## Hoepman's privacy strategies

8. **Minimize:** process the smallest amount of data possible.
9. **Hide:** prevent unnecessary exposure of data and relationships.
10. **Separate:** distribute/separate processing to reduce correlation.
11. **Aggregate:** use the lowest level of detail that satisfies the purpose.
12. **Inform:** explain what data is processed and why.
13. **Control:** provide real controls over data and consent where applicable.
14. **Enforce:** turn privacy policies into technical/organizational controls.
15. **Demonstrate:** be able to demonstrate compliance.

## Complementary rules

16. **Purpose Limitation:** process data for defined and legitimate purposes.
17. **Storage Limitation:** do not retain information indefinitely without need.
18. **Data Classification:** classify sensitivity to apply proportional controls.
19. **Pseudonymization:** reduce the direct link to identity when the purpose allows it.
20. **Anonymization Requires Re-identification Analysis:** do not call data anonymous if it can
    reasonably be linked back to an identity.
21. **Consent Must Not Be a Substitute for Minimization:** having consent does not justify
    collecting everything.
22. **Deletion Is an Architectural Capability:** design data location and deletion from the start.
23. **Data Lineage:** know the origin, transformations, and destinations of sensitive data.
24. **Privacy-Preserving Observability:** debug systems without collecting unnecessary personal
    content.

---

# 17. TESTING, VERIFICATION, AND TESTABILITY PRINCIPLES

1. **Testability by Design:** architecture must allow inputs, effects, and dependencies to be
   isolated.
2. **Deterministic Tests:** the same state/input must produce the same observable result when the
   domain allows it.
3. **Hermetic Tests:** tests should control relevant external dependencies.
4. **Fast Feedback:** place fast checks as close as possible to the change.
5. **Test Pyramid as Cost Heuristic:** more small/cheap tests than expensive end-to-end tests,
   adjusting proportions to the system.
6. **Testing Trophy When Integration Is the Risk Center:** prioritize integrations when the greatest
   uncertainty lives there; do not turn any geometric shape into dogma.
7. **Contract Tests:** verify agreements between independently deployable components.
8. **Consumer-Driven Contract Tests:** verify that providers continue supporting real consumer
   expectations.
9. **Unit Tests Protect Local Behavior:** validate units with appropriate isolation.
10. **Integration Tests Protect Boundaries:** verify real DB, network, serialization, and adapters
    where important.
11. **End-to-End Tests Protect Critical Journeys:** cover high-value business paths without trying
    to model every combination.
12. **Property-Based Testing:** verify properties/invariants over large data spaces when it fits.
13. **Mutation Testing:** evaluate whether tests detect defective changes in critical logic.
14. **Fuzz Testing:** explore unexpected inputs especially in parsers/protocols/security surfaces.
15. **Static Analysis:** detect classes of defects without execution.
16. **Type System as Verification:** express invariants in types when this reduces invalid states.
17. **Formal Methods Where Consequence Justifies Cost:** use specification/model checking/formal
    proofs for critical properties.
18. **Test Observable Behavior, Not Incidental Implementation:** avoid fragile tests coupled to
    internal details.
19. **Mocks at Architectural Seams:** mock boundaries, not every internal method.
20. **Fakes Can Model Useful Semantics:** prefer simple but coherent implementations when mocks lose
    meaning.
21. **Test Data Is Part of Test Design:** datasets must cover edges, invariants, and risks.
22. **Clock/Randomness Injection:** control time and randomness for reproducibility.
23. **Concurrency Tests Need Controlled Scheduling/Stress:** combine determinism with stress testing
    when races may exist.
24. **Performance Tests Against Budgets:** measure objectives, not merely “faster.”
25. **Security Tests Against Threat Model:** link tests to identified threats.
26. **Migration Tests:** validate data compatibility and rollback/forward paths.
27. **Production Verification:** canaries, synthetic checks, and observability complement CI.
28. **No Flaky Tests as Normality:** a nondeterministic test reduces confidence and must be fixed or
    isolated.
29. **Coverage Is Evidence, Not Quality:** high coverage does not prove correct behavior.

---

# 18. OBSERVABILITY AND SRE PRINCIPLES

1. **Observability from Outputs:** be able to infer enough internal state from external signals.
2. **Logs, Metrics and Traces Are Complementary:** each signal answers different questions.
3. **Structured Logging:** events must be analyzable by fields, not only free text.
4. **Context Propagation:** propagate trace/correlation context across processes and async
   boundaries.
5. **High-Cardinality Dimensions Deliberately:** retain useful dimensions without destroying
   cost/privacy.
6. **Measure User-Visible Outcomes:** prioritize signals tied to experience/contract.
7. **Logs Need Retention and Privacy Policies:** observability is also a data system.
8. **Telemetry Must Not Break the Product:** instrumentation must degrade safely.
9. **Cardinality and Sampling Are Architecture Decisions:** control cost without destroying required
   signals.
10. **Operational Readiness:** before production, define metrics, alerts, dashboards, runbooks,
    rollback, and ownership.
11. **Telemetry Schema Stability:** names and attributes used in automation must evolve with
    discipline.
12. **Business Observability:** correlate technical health with business outcomes without replacing
    technical metrics.

---

# 19. EVOLUTION, COMPATIBILITY, AND EVOLUTIONARY ARCHITECTURE PRINCIPLES

1. **Evolutionary Architecture:** allow incremental change guided by observable outcomes.
2. **Fitness Functions:** automate important architectural constraints/attributes.
3. **Reversible Decisions:** prefer options with low reversal cost under uncertainty.
4. **Incremental Change:** reduce change size to lower risk and accelerate feedback.
5. **Backward Compatibility:** preserve old consumers during a defined window.
6. **Forward Compatibility:** design consumers tolerant of safe future extensions.
7. **Semantic Versioning:** communicate the impact of changes through versions when the ecosystem
   follows that contract.
8. **Deprecation Lifecycle:** announce, measure usage, migrate, and retire.
9. **Expand and Contract:** compatible evolution in multiple stages.
10. **Feature Flags:** decouple deployment from activation with lifecycle and ownership.
11. **Migration Must Have Exit Criteria:** every temporary bridge needs an exit condition and owner.
12. **Architecture Debt Must Be Visible:** record deviations that increase future cost.
13. **Sunset Is Part of Design:** every temporary component or old version needs a retirement
    strategy.

---

# 20. CI/CD AND DEVOPS PRINCIPLES

1. **Continuous Integration:** integrate small changes frequently and verify them automatically.
2. **Build Once, Promote the Same Artifact:** avoid rebuilding different artifacts per environment.
3. **Immutable Artifacts:** the promoted binary/image must not mutate between stages.
4. **Automate Repetitive Delivery Steps:** reduce human variation in build/test/deploy.
5. **Pipeline as Code:** version delivery definitions where feasible.
6. **Fast Feedback:** cheap failures must be detected before expensive checks.
7. **Fail the Pipeline on Broken Invariants:** do not allow critical warnings to become normalized.
8. **Small Batch Size:** small changes are easier to review, deploy, and reverse.
9. **Trunk-Based Integration Where Appropriate:** reduce long-lived branches and divergence.
10. **Deployment Is Not Release:** deploying code and exposing functionality may be separate
    decisions.
11. **Automated Rollback or Safe Roll-Forward:** define recovery before deployment.
12. **Progressive Delivery:** expand exposure as health evidence accumulates.
13. **Environment Parity:** minimize nonessential differences between environments.
14. **Secrets Never in Source/Pipeline Logs:** manage credentials through dedicated systems.
15. **Supply-Chain Provenance:** trace the origin of artifacts and dependencies.
16. **Reproducible Builds Where Feasible:** the same input should allow equivalent artifacts to be
    rebuilt.
17. **Deployment Observability:** every change must correlate with metrics, errors, and rollback.

---

# 23. REACTIVE SYSTEMS PRINCIPLES

1. **Responsive:** responding in a timely manner is part of usability and reliability.
2. **Message-Driven:** use asynchronous messaging to decouple, isolate, and handle backpressure
   where the problem requires it.
3. **Asynchrony Requires Error Semantics:** define how timeouts, cancellations, and failures are
   communicated.
4. **Queues Are Not Infinite:** elasticity does not eliminate the need for limits.
5. **Backpressure Is Part of Responsiveness:** production must adapt to consumption capacity.
6. **Isolation Before Recovery:** contain the failure before attempting recovery.

---

# 24. FUNCTIONAL AND EFFECT-HANDLING PRINCIPLES

1. **Referential Transparency:** pure expressions can be replaced by their result without changing
   behavior.
2. **Pure Functions:** minimize external effects in logic where this facilitates reasoning.
3. **Immutable Data:** prefer transforming values over shared mutation.
4. **Explicit Effects:** IO, time, randomness, and errors should be visible in the structure/API
   when practical.
5. **Function Composition:** build complex behavior by combining small transformations.
6. **Totality:** model errors/absence in types to avoid implicit paths.
7. **Algebraic Data Types:** represent alternatives and valid states in a closed form when the
   language allows it.
8. **Pattern Matching Exhaustiveness:** make new variants force consumers to be reviewed when
   useful.
9. **Persistent Data Structures:** share structure without mutation when the cost/benefit is
   favorable.
10. **Effect Isolation:** group effects at the edges to make the core more verifiable.
11. **Values over Places:** reason about values independently of mutable location.
12. **Data Transformation Pipelines:** prefer composable stages over global mutations.
13. **Error as Data Where Appropriate:** represent expected failures as values, not always
    exceptions.
14. **Exceptions for Exceptional/Unrecoverable Conditions:** distinguish expected domain failures
    from exceptional problems according to language conventions.
15. **No Hidden Global State:** avoid functions whose result depends on invisible global context.

---

# 26. ACCESSIBILITY AND INCLUSIVE DESIGN PRINCIPLES

## WCAG / POUR

1. **Perceivable:** information must be presented in ways users can perceive.
2. **Operable:** the interface must be operable through different input modalities.
3. **Understandable:** content and behavior must be understandable/predictable.
4. **Robust:** content must interoperate with user agents and assistive technologies.
5. **Keyboard Accessibility:** essential functions must not require only pointer/touch.
6. **Semantic Structure:** use native semantics before artificial roles.
7. **Visible Focus:** keyboard navigation needs a perceptible focus indicator.
8. **Sufficient Contrast:** text and components need contrast according to the target level.
9. **Text Alternatives:** informative non-text content needs a textual alternative.
10. **Captions/Transcripts:** multimedia content requires alternatives according to modality.
11. **Error Identification:** explain what went wrong and how to fix it.
12. **Labels and Instructions:** controls must have an identifiable name/purpose.
13. **Do Not Encode Meaning by Color Alone:** use additional signals.
14. **Respect Reduced Motion:** nonessential animations must adapt to preferences.
15. **Zoom/Reflow:** interfaces must tolerate enlargement and reflow without losing functionality.
16. **Accessible Authentication:** avoid unnecessary cognitive tests as the only path.
17. **Touch Target Sizing:** interactive targets must be sufficiently large/separated.
18. **Accessibility Is Architectural:** components, design systems, and navigation must incorporate
    accessibility from the foundation.

---

# 28. SUSTAINABILITY AND GREEN SOFTWARE PRINCIPLES

1. **Energy Efficiency:** reduce energy per useful unit of work.
2. **Measure before Optimizing Sustainability:** use metrics such as SCI where appropriate.
3. **Efficient Data Movement:** unnecessary transfer/storage consumes resources.
4. **Software Longevity:** maintainability and compatibility can extend the useful life of
   devices/systems.
5. **Performance and Sustainability Often Align but Not Always:** measure trade-offs instead of
   assuming equivalence.

---

# 29. ORGANIZATIONAL, TEAM, AND CONWAY PRINCIPLES

3. **Team Ownership:** a component needs a team clearly responsible for its lifecycle.
4. **Cognitive Load Is a Design Constraint:** a team must be able to understand/operate its domain
   without carrying the entire system.
5. **Minimize Handoffs:** every transfer of responsibility adds waiting and context loss.
6. **Decision Authority Near Knowledge:** reversible decisions should be made close to those who
   hold the context.
7. **Architecture Governance as Enablement:** standards should enable safe autonomy, not create
   central approval for everything.
8. **Golden Paths, Not Golden Cages:** provide recommended paths without preventing justified
   exceptions.

---

# 30. LAWS, HEURISTICS, AND RESULTS THAT CONSTRAIN ARCHITECTURE

2. **Amdahl's Law:** the unimproved part limits overall speedup.
3. **Hyrum's Law:** with enough consumers, every observable behavior will tend to be used by
   someone.
4. **Law of Leaky Abstractions:** abstractions do not completely eliminate underlying details;
   failures/performance can leak through them.
5. **Gall's Law:** complex systems that work tend to evolve from simple systems that worked.
6. **Goodhart's Law:** when a measure becomes a target, it may stop being a good measure.
7. **Postel's Law — Use with Caution:** being liberal in what is accepted can create
   ambiguity/insecurity; modern protocols often prefer strict validation and explicit evolution.
8. **End-to-End Principle:** complete properties must be checked at the endpoints even if
   intermediate layers help.
9. **Principle of Locality:** accesses close in time/space tend to benefit from memory/caches, but
   this must be measured.
10. **Pareto Heuristic:** a small fraction of paths often dominates load/defects; use it as a
    hypothesis, not a universal law.

---

# 31. QUALITY ATTRIBUTES — ISO/IEC 25010 AS A DECISION FRAMEWORK

1. **Functional Suitability:** the product provides functions that satisfy explicit/implicit needs.
2. **Performance Efficiency:** performance relative to resources used under defined conditions.
3. **Compatibility:** ability to exchange information/coexist with other systems.
4. **Interaction Capability:** users' ability to interact and achieve goals.
5. **Reliability:** maintain functions under defined conditions and time.
6. **Security:** protect information/data from unauthorized access or modification.
7. **Maintainability:** effectiveness/efficiency with which it can be modified.
8. **Flexibility:** adapt to changes in requirements, context, or environment.
9. **Safety:** avoid states that produce unacceptable risk to people, property, or the environment.

## Architectural quality principle

10. **Quality Attributes Drive Architecture:** latency, availability, security, maintainability,
    etc. must be expressed as measurable scenarios/objectives.
11. **Quality Is Contextual:** “fast,” “secure,” or “scalable” without threshold/context is not a
    verifiable requirement.
12. **Quality Trade-offs Must Be Recorded:** decisions that favor one attribute at the expense of
    another must be made explicit.
13. **Quality Must Be End-to-End:** optimizing one component does not guarantee quality of the
    complete system.
14. **Quality Must Be Continuously Verified:** critical attributes require monitoring/tests during
    evolution.

---

# 32. ARCHITECTURE DOCUMENTATION AND GOVERNANCE PRINCIPLES

1. **Architecture Description Has Stakeholders:** document for the real concerns of stakeholders.
2. **Views Address Concerns:** different views describe structure according to different questions.
3. **Viewpoints Define Conventions:** a view must have understandable language and rules.
4. **C4 Context:** show the system, users, and external systems.
5. **C4 Container:** show applications/services/datastores and responsibilities.
6. **C4 Component:** show internal components only where they add value.
7. **C4 Code:** code-level detail is optional and should be avoided when it does not improve
   understanding.
8. **ADRs — Architecture Decision Records:** record context, decision, and consequences.
9. **Decision Status:** proposed/accepted/superseded/deprecated must remain visible.
10. **Link Decisions to Evidence:** benchmarks, incidents, requirements, and experiments should
    accompany relevant decisions.
11. **Living Documentation:** documentation that contradicts the system should be considered a
    defect.
12. **Docs Close to Code Where Helpful:** keep versioned documentation close to the implementation
    when this reduces drift.
13. **Diagrams Need Scope and Legend:** a diagram without level, boundaries, or meaning can mislead.
14. **Avoid Diagramming Everything:** document what reduces risk/complexity, not every class.
15. **Fitness Functions as Governance:** automate verifiable rules.
16. **Architecture Tests:** verify dependencies, layers, cycles, and critical conventions.
17. **Exceptions Need Records:** a deviation from a standard must have a reason, owner, and review
    date/condition.
18. **Standards Need Rationale:** “just because” is not a maintainable architectural policy.
19. **Governance Proportional to Risk:** reversible and local decisions require less ceremony.
20. **Architecture Review Is Not Ownership Transfer:** the team remains responsible after a review.

---

# 34. MOBILE, OFFLINE-FIRST, AND LOCAL-FIRST PRINCIPLES

1. **Network Is Optional at Any Moment:** a mobile app must tolerate temporary loss of connectivity
   when the use case requires it.
2. **Local Source for Immediate UX:** use local state for low-latency interaction when consistent
   with authority.
3. **Sync Is a Protocol, Not a Boolean:** define discovery, transfer, conflict, retry, and
   convergence.
4. **Conflict Policy Is Domain-Specific:** last-write-wins does not work for every invariant.
5. **Optimistic UI Requires Reconciliation:** anticipated local changes need rollback/correction if
   the server rejects them.
6. **Pending Operations Must Survive Restart When Needed:** persist important intents before sending
   them.
7. **Idempotent Sync:** synchronization retries must not duplicate effects.
8. **Connectivity Changes Are Signals, Not Truth:** “online” does not guarantee the target backend
   is reachable.
9. **Battery Is a Resource:** batch/resize network/background work.
10. **Background Execution Is Constrained:** design according to each platform's policies.
11. **Storage Is Not Infinite:** caches and downloads need limits/eviction.
12. **Sensitive Local Data Needs Protection:** encryption/secure storage according to threat.
13. **Schema Migration on Device:** old versions may update after months.
14. **Backward-Compatible Server APIs for Mobile:** clients cannot be forced to update
    simultaneously.
15. **Offline Semantics Must Be Visible:** indicate to the user when data/actions are pending or
    stale.
16. **Local-First Ownership Where Applicable:** prioritize local copies and collaboration/sync
    without making the server an interaction bottleneck, if the domain allows it.

---

# 35. KOTLIN MULTIPLATFORM-SPECIFIC PRINCIPLES (DERIVED)

1. **Share Business Logic, Not Platform Accidents:** share logic when semantics are common; do not
   force identical APIs where platforms differ.
2. **Common Code Owns Common Contracts:** place shared contracts in `commonMain` when they do not
   depend on exclusive capabilities.
3. **Platform Adapters Own Platform APIs:** encapsulate Android/iOS/Desktop/Web behind shared
   interfaces when useful.
4. **Expect/Actual Sparingly:** use `expect/actual` for genuine platform differences, not as general
   DI.
5. **Prefer Interfaces for Replaceable Services:** contracts facilitate testing and multiplatform
   composition.
6. **No Android Types in Common Domain:** keep the shared domain free of Android/iOS types.
7. **Platform UI May Diverge:** sharing state/logic does not require sharing all UI.
8. **Source Sets Are Architectural Boundaries:** dependencies must respect the source-set hierarchy.
9. **Avoid Leaking Platform Threading Models:** expose appropriate suspending/Flow contracts instead
   of platform-specific handlers.
10. **Coroutine Ownership Is Shared Architecture:** scopes must not be created globally inside
    repositories without an owner.
11. **Dispatcher Injection/Abstraction for Testability:** control execution context when it affects
    testing.
12. **Immutable UI State:** favor immutable snapshots for Compose/Swift interop.
13. **StateFlow for Observable State, Flow for Streams:** choose semantics according to whether
    there is an authoritative current value.
14. **Repository Boundaries Hide Storage/Network:** the domain should not know
    SQLDelight/Room/Ktor/etc.
15. **Serialization Contracts Are Cross-Platform Contracts:** version external models independently
    from internal models.
16. **Keep Interop Surface Small:** APIs exported to Swift/Objective-C/JS must be deliberate.
17. **Platform Lifecycle Must Be Adapted:** map the host lifecycle to shared scopes/resources.
18. **One Responsibility per Significant Component:** apply SRP to modules/shared features as well.
19. **One Component per File as Repository Convention:** when adopted, keep exceptions limited to
    trivial, closely related types.
20. **Build Logic Is Architecture:** centralize Gradle conventions to avoid drift between modules.
21. **Dependency Versions Are Shared Policy:** use version catalogs/conventions for consistency.
22. **No Unnecessary Shared Abstraction:** if a function exists only on one platform, keep it there.
23. **Test Common Logic in Common Tests:** test invariants once at the shared level.
24. **Test Platform Adapters per Platform:** shared contracts do not replace real integration tests.
25. **Performance Must Be Measured on Every Target:** an abstraction cheap on JVM may be expensive
    on Native/JS/Wasm.

---

# 36. UI, STATE, AND REACTIVE FLOW PRINCIPLES

1. **Single Source of UI Truth:** every screen must derive from an authoritative state.
2. **Unidirectional Event Flow:** UI emits intents/events; a responsible layer updates state.
3. **Render from State:** the view should be a projection of state, not a second mutable source.
4. **Derived UI State Is Derived:** compute secondary values instead of synchronizing copies.
5. **State Hoisting:** move state to the lowest common owner that needs to coordinate it.
6. **Stable State Models:** states must clearly represent loading/content/empty/error where
   applicable.
7. **Events Are Not Durable State:** navigation/toasts/ephemeral effects require semantics separate
   from persistent state.
8. **Avoid Two-Way Hidden Binding:** implicit bidirectional changes make ownership harder.
9. **Lifecycle-Aware Collection:** subscriptions must follow the visibility/lifetime of the
   consumer.
10. **Cancellation of Obsolete Work:** searches/navigation must cancel work that is no longer
    relevant.
11. **Debounce/Throttle by Semantics:** control frequency only when the domain justifies it.
12. **Optimistic UI Must Be Reversible:** preserve intent identity and reconciliation.
13. **Accessibility Is Component-Level:** reusable components must incorporate accessible semantics.
14. **Design System as Contract:** tokens/components establish visual and interaction consistency.
15. **UI Performance Budget:** frame time, startup, and memory must have per-platform objectives.
16. **Progressive Disclosure:** do not force loading/rendering complexity the user does not yet
    need.
17. **Error Recovery Near Failure:** show recoverable actions where the user can act.
18. **Navigation State Is State:** deep links, back stack, and restoration must be modeled
    explicitly.

---

# 40. CONFIGURATION, FLAGS, AND SECRETS PRINCIPLES

1. **Configuration Is Not Code Logic:** data that varies by environment must not require scattered
   branches.
2. **Configuration Is Versioned or Auditable:** operational changes need traceability.
3. **Validate Configuration at Startup:** fail early on invalid configuration.
4. **Typed Configuration:** represent types/units instead of ambiguous strings.
5. **Safe Defaults:** defaults must not open risks.
6. **No Secret Defaults:** absence of a secret must fail, not fall back to a known credential.
7. **Secrets Are Separate from General Config:** storage, permissions, and rotation are different.
8. **Feature Flags Have Owners:** every flag needs purpose, owner, and retirement date.
9. **Flags Are Temporary Unless Explicitly Permanent:** flag debt must be managed.
10. **Decouple Deployment from Release:** flags can control exposure.
11. **Server-Side Authorization Cannot Depend on Client Flag:** hiding UI is not access control.
12. **Flag Evaluation Must Be Deterministic/Observable:** be able to explain why a user received a
    variant.
13. **Kill Switches:** risky capabilities may require rapid deactivation.
14. **Configuration Rollback:** preserve a path to reverse changes.
15. **Config Changes Need Progressive Rollout When Risky:** treat configuration as operational code.
16. **Avoid Configuration Explosion:** too many combinations multiply untested states.
17. **Environment Variables Are One Mechanism, Not a Universal Rule:** complex systems may require
    config stores, files, or APIs with appropriate security.

---

# 41. CACHING PRINCIPLES

1. **Cache Is a Copy, Not Authority:** the authoritative source must be defined.
2. **Cache Invalidation Is a Protocol:** decide when and how entries are removed/updated.
3. **TTL Encodes Staleness Tolerance:** choose TTL according to freshness semantics.
4. **Cache Key Includes All Varying Inputs:** omitting tenant, locale, auth, or other factors
   produces incorrect data.
5. **Never Cache Sensitive Responses Without Policy:** privacy and sharing controls matter.
6. **Cache Stampede Protection:** use request coalescing, locks, jitter, or stale-while-revalidate.
7. **Negative Caching:** cache “does not exist” only with appropriate TTL and semantics.
8. **Write-Through/Write-Behind/Cache-Aside Are Trade-offs:** choose according to consistency and
   failure.
9. **Stale-While-Revalidate:** serve an old copy while refreshing only if the product tolerates it.
10. **Stale-if-Error:** fallback to old data requires a limit and transparency.
11. **Bound Cache Size:** every cache needs an eviction policy.
12. **Warmup Is Operational:** a cold cache can cause incidents after deployment.
13. **Cache Hit Ratio Is Not Enough:** measure latency, cost, and staleness.
14. **Avoid Caching Errors Indefinitely:** transient failures must not become persistent truth.
15. **Cache Removal Must Not Break Correctness:** ideally, a cache improves performance, not
    essential semantics.

---

# 42. CONSISTENCY, TRANSACTIONS, AND COORDINATION PRINCIPLES

1. **ACID Is Local Unless Proven Otherwise:** atomicity/isolation must be understood at the
   datastore's real boundary.
2. **Isolation Level Is a Business Decision:** choose the level according to anomalies the domain
   can tolerate.
3. **Serializable for Strong Invariants:** use when weaker anomalies would violate critical rules.
4. **Optimistic Concurrency Control:** detect conflicts through versions when collisions are
   infrequent.
5. **Pessimistic Locking:** lock when conflict is costly/frequent and latency allows it.
6. **Lost Update Prevention:** versions/locks/atomic updates must protect concurrent modifications.
7. **Compare-and-Set:** update only if the observed state is still current.
8. **Idempotency Key:** bind repetition of an intent to a single logical effect.
9. **Unique Constraints Enforce Uniqueness at Authority:** do not rely only on a prior check.
10. **Database Constraints Protect Invariants:** use the engine for structural rules it can
    guarantee.
11. **Transaction Scope Must Be Small:** reduce locks, contention, and duration.
12. **No Network Call inside DB Transaction Unless Justified:** remote latency amplifies locks and
    failure.
13. **Read-Your-Writes Semantics:** define whether the user must immediately observe their own
    write.
14. **Monotonic Reads:** avoid showing the user state moving backward if UX requires it.
15. **Causal Consistency:** preserve cause→effect when required.
16. **Eventual Consistency Needs Convergence:** there must be a mechanism to converge, not merely
    hope.
17. **Conflict Resolution Is Domain Logic:** automatic merges require semantic rules.
18. **Reconciliation:** distributed systems need processes that detect/correct divergence.

---

# 43. NETWORKING AND PROTOCOL PRINCIPLES

1. **Protocol Semantics before Serialization:** JSON/Protobuf/etc. do not define meaning.
2. **Framing:** messages need unambiguous boundaries.
3. **Length/Resource Limits:** reject excessive messages before exhausting memory.
4. **Timeout Every Network Operation:** connect/read/write/deadline must have a policy.
5. **End-to-End Deadline Propagation:** propagate remaining time to avoid useless work.
6. **Connection Pooling:** reuse connections within limits.
7. **Connection Pool Is Finite:** protect the pool from exhaustion.
8. **Keepalive Is Failure Detection Aid, Not Proof:** it helps detect inactivity; it does not
   eliminate partitions.
9. **Retries at One Appropriate Layer:** retries multiplied across layers create explosion.
10. **Exponential Backoff + Jitter:** reduce synchronization during incidents.
11. **DNS Is a Dependency:** DNS caching, TTL, and failure must be considered.
12. **TLS Is Part of Protocol:** handshake, certificates, and rotation affect availability.
13. **Version Negotiation:** peers with different lifecycles need a compatible mechanism.
14. **Compression Is a CPU/Bandwidth Trade-off:** apply according to payload and cost.
15. **Head-of-Line Blocking Awareness:** protocol/transport can amplify latency.
16. **Multiplexing Is Not Free:** stream/concurrency limits are still necessary.
17. **Request Size Limits:** protection against abuse and memory pressure.
18. **Response Streaming for Large Data:** avoid full buffering when unnecessary.
19. **Network Boundaries Are Trust Boundaries Unless Proven Otherwise:** authenticate/encrypt
    according to threat.

---

# 44. ECONOMIC AND ARCHITECTURAL COST PRINCIPLES

2. **Total Cost of Ownership:** include development, licenses, operation, migration, support, and
   exit.
3. **Opportunity Cost:** a sophisticated abstraction consumes time not invested in the product.
4. **Build vs Buy:** evaluate differentiation, control, risk, cost, and time.
5. **Complexity Has Carrying Cost:** every service/framework requires ongoing maintenance.
6. **Optimize High-Cost Paths First:** use measured Pareto, not intuition.
7. **Sunk Cost Is Not a Reason to Continue:** reevaluate technology according to future costs.
8. **Exit Cost Is Part of Vendor Choice:** migration and data must be included when deciding
   lock-in.

---

# 45. MAINTAINABILITY AND CODE HEALTH PRINCIPLES

1. **Readability over Cleverness:** code read many times should prioritize understanding.
2. **Naming Is Architecture at Small Scale:** names must communicate domain and responsibility.
3. **Small Public Surface:** fewer public contracts reduce change cost.
4. **Explicit Boundaries:** directories/modules must reveal system structure.
5. **No Dumping-Ground Modules:** avoid `Utils`, `Common`, `Misc` as low-cohesion accumulators.
6. **One Component per File:** a useful convention for significant components, without turning it
   into dogma for trivial, closely related types.
7. **Delete Dead Code:** unused code increases cognitive and security surface.
8. **Dependency Hygiene:** remove unused dependencies and update risky ones.
9. **Warnings Are Debt:** keep compilation/lint clean enough that new warnings remain visible.
10. **Refactor Continuously:** improve structure through small changes.
11. **Boy Scout Rule — Heuristic:** leave the touched area better without irresponsibly expanding
    scope.
12. **Comments Explain Why, Not Obvious What:** code expresses mechanism; comments document
    decisions/non-obviousness.
13. **Avoid Boolean Blindness:** use types/names when multiple booleans make a call ambiguous.
14. **Avoid Primitive Obsession:** domain types can protect invariants/units.
15. **Consistent Error Handling:** a layer must have a coherent strategy.
16. **No Hidden Global Mutable State:** it makes testing and reasoning harder.
17. **Cognitive Complexity Matters:** limit nesting, branches, and mental dependencies.
18. **Change Coupling Is a Signal:** files that repeatedly change together may reveal an incorrect
    boundary.
19. **Code Ownership with Reviewability:** ownership must not prevent shared knowledge.
20. **Architecture Should Scream Domain:** the main structure should reveal business capabilities,
    not just frameworks.

---

# 46. INTEROPERABILITY AND PORTABILITY PRINCIPLES

1. **Standards before Proprietary Protocols When Equivalent:** favor interoperability when the
   cost/benefit justifies it.
2. **Canonical Contracts:** define a common representation at boundaries.
3. **Adapters at Boundaries:** translate external models into internal ones.
4. **No Internal Model as Universal Integration Schema:** avoid coupling consumers to internal
   changes.
5. **Version Negotiation:** support peers with different lifecycles.
6. **Capability Detection:** detect capabilities instead of assuming version when more robust.
7. **Graceful Unknown Fields:** ignore unknown extensions only where the format safely allows it.
8. **Explicit Units/Timezones/Encoding:** do not rely on local defaults.
9. **Unicode by Default:** handle international text correctly.
10. **Stable Wire Formats:** internal changes must not accidentally alter serialization.
11. **Portable Core, Native Edges:** share portable logic while taking advantage of native
    capabilities where they matter.
12. **Abstraction Cost Must Be Measured:** total portability can degrade UX/performance.
13. **Data Exportability:** avoid irreversible lock-in to formats with no exit when the business
    requires portability.
14. **Protocol Conformance Tests:** verify implementation against the standard.
15. **Interoperability Requires Semantics, Not Just Syntax:** two systems that share JSON may still
    not understand each other.

---

# 49. SOFTWARE PRODUCT LINE AND VARIABILITY PRINCIPLES

1. **Variation Points Are Explicit:** identify where the product may vary.
2. **Commonality Analysis:** separate common capabilities from variants.
3. **Feature Model:** represent allowed/forbidden combinations.
4. **Avoid Fork-per-Customer:** forks diverge and multiply maintenance.
5. **Configuration over Forking:** parameterize legitimate variation.
6. **Compile-Time vs Runtime Variability:** choose according to performance, security, and change
   frequency.
7. **Invalid Configurations Are Prevented:** validate feature constraints.
8. **Test Representative Configurations:** combinatorial explosion requires a strategy.
9. **Variant Ownership:** every variant needs an owner and lifecycle.
10. **Sunset Variants:** retire unused combinations.
11. **Stable Core, Variable Edges:** concentrate commonality and isolate differences.
12. **Feature Flags Are Not a Product-Line Architecture Alone:** temporary flags do not replace
    modeling permanent variants.

---

# 52. ARCHITECTURAL DECISION-MAKING PRINCIPLES

1. **State the Problem before the Solution:** document the need and constraints before choosing
   technology.
2. **List Alternatives:** a decision without compared alternatives may be an unevaluated preference.
3. **Record Consequences:** document benefits, costs, risks, and debt.
4. **Separate Facts, Assumptions and Preferences:** do not treat a hypothesis as evidence.
5. **Validate High-Risk Assumptions Early:** prototypes/benchmarks/spikes should attack uncertainty.
6. **Use Decision Drivers:** quality attributes, cost, skills, time, compliance, and product.
7. **Prefer Reversible Experiments:** test cheaply before committing architecture.
8. **Timebox Spikes:** research must produce evidence, not become a parallel product.
9. **Architecture Decision Record:** record enough of the decision for the future.
10. **Supersede, Don't Erase History:** preserve traceability when a decision changes.
11. **Decision Scope Matches Authority:** local decisions do not need a global committee.
12. **Review by Risk:** more review for irreversible, sensitive, or systemic changes.
13. **Measure after Decision:** verify whether assumptions held.
14. **Sunset Failed Experiments:** remove mechanisms that do not provide value.
15. **Avoid Architecture by Resume:** choose technology based on need, not résumé appeal.
16. **Avoid Consensus Theater:** resolve disagreement through drivers/evidence/clear authority.
17. **Document “Why Not”:** important rejected alternatives reduce repeated debates.
18. **Decision Expiry/Review Date:** temporary assumptions must be reevaluated.
19. **Architecture Principles Must Be Enforceable or Advisory by Label:** distinguish mandatory
    rules from guidance.
20. **Local Autonomy within Guardrails:** standardize systemic risks and allow freedom in local
    details.

---

# 53. MIGRATION AND MODERNIZATION PRINCIPLES

1. **Strangler Fig:** replace functionality incrementally around the legacy system.
2. **Branch by Abstraction:** introduce a stable abstraction to gradually replace an implementation.
3. **Parallel Run:** compare old and new implementations before cutover.
4. **Expand and Contract:** maintain compatibility during gradual deployment.
5. **Rollback Compatibility:** a new release must not make rollback impossible without a plan.
6. **Forward Fix When Rollback Is Unsafe:** define when to fix forward.
7. **Migration Invariants:** define what must remain true during the hybrid state.
8. **Cutover Has Entry/Exit Criteria:** do not base migration on intuition.
9. **Legacy Is a Dependency:** instrument and encapsulate it before replacing it.
10. **Anti-Corruption Layer during Transition:** prevent the legacy model from colonizing the new
    one.
11. **Delete Bridges after Migration:** temporary adapters must not accidentally become permanent.
12. **Migrate by Capability:** reduce scope and risk compared with a full rewrite.
13. **Rewrite Requires Proof:** a complete rewrite destroys implicit knowledge and must be justified
    with evidence.

---

# 54. FILE, PACKAGE, NAMING, AND REPOSITORY PRINCIPLES

1. **One Significant Component per File:** a useful convention for navigation and ownership of
   nontrivial components.
2. **File Name Matches Primary Concept:** facilitate search and navigation.
3. **Package by Feature/Domain When It Reveals Architecture:** group by capability before technology
   when appropriate.
4. **Avoid Generic Buckets:** `utils`, `helpers`, `common` require discipline or become dumping
   grounds.
5. **Public/Internal Separation:** public surface must be distinguished from implementation.
6. **Directory Structure Mirrors Architectural Boundaries:** the tree must make modules and
   ownership visible.
7. **No Circular Module Dependencies:** preserve a module DAG.
8. **Test Layout Mirrors Ownership, Not Necessarily Exact File Tree:** tests should be found close
   to the concepts they protect.
9. **Generated Code Is Separated:** distinguish generated code from hand-written code.
10. **Build Outputs Are Not Source:** do not version derived artifacts without an explicit reason.
11. **Repository Root Has Clear Entrypoints:** README/CONTRIBUTING/build instructions must guide
    usage.
12. **Naming Is Stable at Public Boundaries:** renaming public APIs is a contract change.
13. **Avoid Abbreviations without Shared Meaning:** names must be understandable beyond the original
    author.
14. **No Type Suffixes without Value:** names must express role, not noise (`Manager`, `Helper`,
    `Util`).
15. **Feature Ownership Is Discoverable:** CODEOWNERS or equivalent documentation when scale
    requires it.
16. **Monorepo vs Polyrepo Is a Trade-off:** choose according to change atomicity, tooling,
    permissions, and teams.
17. **Repository Boundary Is Not Automatically Service Boundary:** do not infer distribution from
    Git.
18. **Shared Libraries Need Release Discipline:** versioning and compatibility.
19. **No Cross-Module Internal Imports:** internal boundaries must be enforceable.
20. **Architecture Linting:** automate conventions that truly matter.

---

# 55. DEPENDENCY MANAGEMENT PRINCIPLES

1. **Minimize Dependencies:** every dependency adds failure, security, update, and licensing
   surface.
2. **Depend on Maintained Software:** evaluate activity, ownership, security, and compatibility.
3. **Pin/Reproduce Resolved Versions:** builds must know which artifact they used.
4. **Lock Files/Resolved Metadata Where Ecosystem Supports:** avoid surprise transitive changes.
5. **Update Continuously:** small jumps usually reduce risk compared with years of lag.
6. **Automate Vulnerability Scanning:** but review exploitability/context, not just CVE count.
7. **Know Transitive Dependencies:** risk can enter indirectly.
8. **No Dependency for Trivial Functionality without Justification:** balance in-house maintenance
   cost against external cost.
9. **License Compatibility:** dependencies bring legal obligations.
10. **Source/Artifact Provenance:** verify repositories and signatures/attestations when relevant.
11. **Dependency Abstraction Only for Volatile/Strategic Boundaries:** wrapping every library
    reflexively creates useless layers.
12. **Keep Vendor Types at the Edge When Exit Risk Is Real:** do not contaminate the domain with
    external APIs when replacement is plausible.
13. **Version Compatibility Matrix:** platforms/targets may require supported combinations.
14. **Avoid Diamond Version Conflicts:** control BOM/version catalogs/resolution.
15. **Dependency Removal Is a Feature:** removing obsolete libraries reduces risk.
16. **SBOM Where Required/Useful:** a component inventory facilitates incident response.
17. **Transitive API Leakage:** a public library should not force consumers to know unnecessary
    internal dependencies.
18. **Binary Compatibility Matters for Libraries:** signature/ABI changes can break consumers
    without recompilation.
19. **Dependency Policy Is Automated:** allow/deny lists, licenses, and critical vulnerabilities can
    be verified in CI.

---

# 56. ERROR, EXCEPTION, AND RESULT PRINCIPLES

1. **Expected vs Exceptional Failure:** model expected business errors differently from unexpected
   failures when language/context allows it.
2. **Errors Are Part of the Contract:** consumers need to know what can fail and how to react.
3. **Preserve Cause:** do not lose the original cause when translating errors.
4. **Translate at Boundaries:** DB/network details must not leak as the domain contract.
5. **No Empty Catch:** catching implies handling, enriching, or propagating.
6. **Do Not Swallow Cancellation/Interrupts:** execution-control mechanisms must be preserved.
7. **Fail Fast on Programmer Errors:** violated internal invariants must be made visible.
8. **Graceful on User/External Errors:** invalid inputs or failed dependencies need controlled
   responses.
9. **Error Codes Are Stable Contracts:** human messages can change; machine codes require stability.
10. **Actionable Errors:** include enough context to correct the issue without leaking secrets.
11. **No Sensitive Data in Errors:** stack traces/tokens/PII must not be exposed to the user.
12. **Retryability Is Explicit:** classify transient/permanent failures.
13. **Observability Links Errors to Correlation IDs:** facilitate diagnosis.
14. **Do Not Use Exceptions for Normal High-Volume Branching When Costly:** choose the mechanism
    according to language/performance.
15. **Result Types Prevent Forgotten Failures Where Appropriate:** make handling explicit.

---

# 57. TIME AND TEMPORAL SEMANTICS PRINCIPLES

1. **Store Instants in an Unambiguous Timeline:** use instants/UTC for global events where
   appropriate.
2. **Local Date/Time Is a Different Type:** “9:00 in Bogotá” is not the same as an instant.
3. **Timezone Is Data:** preserve the zone when civil meaning depends on it.
4. **DST Exists:** do not assume 24-hour days or unique local hours.
5. **Calendar Arithmetic Is Not Duration Arithmetic:** “one month” is not equivalent to a fixed
   number of seconds.
6. **Monotonic Clock for Durations:** measure elapsed time with a monotonic clock.
7. **Wall Clock Can Jump:** NTP/user/VM can move civil time.
8. **Deadlines over Independent Timeouts:** propagate an end-to-end deadline when possible.
9. **Clock Skew:** timestamps from different nodes do not guarantee causal order.
10. **Logical Clocks for Causality:** use Lamport/vector clocks or other mechanisms when causal
    order matters.
11. **Expiration Semantics Are Explicit:** TTL starts from creation/last access/etc. according to
    contract.
12. **Timestamps Need Precision Contract:** milliseconds/microseconds and truncation can affect
    equality.
13. **Time Source Is Injectable in Tests:** avoid tests dependent on the real clock.
14. **Recurring Civil Time Uses Timezone Rules:** local cron must account for timezone/DST changes.

---

# 58. IDENTITY AND IDENTIFIER PRINCIPLES

1. **Identity Has Scope:** an ID may be unique per tenant, aggregate, or globally; declare it.
2. **Stable Identity:** do not use mutable attributes as a stable identifier.
3. **Opaque Public IDs:** avoid revealing sequence/infrastructure when unnecessary.
4. **Natural Keys vs Surrogate Keys Are Trade-offs:** choose according to stability and semantics.
5. **No Reuse of Retired IDs When Ambiguous:** recycling can confuse caches/auditing.
6. **ID Generation Must Scale to Coordination Needs:** central, UUID/ULID/Snowflake/etc. according
   to ordering, privacy, and throughput.
7. **Sortability Is a Requirement, Not Default:** sortable IDs leak time and have trade-offs.
8. **Identifier Case/Normalization:** define sensitivity and Unicode behavior.
9. **External IDs vs Internal IDs:** separate them when external contracts have a different
   lifecycle.
10. **Idempotency Identity:** a repeated intent needs a stable key distinct from the resource ID
    when appropriate.
11. **Correlation IDs Are Not Security Tokens:** traceability must not confer authorization.
12. **User Identity Is Not Email:** emails/phone numbers can change.
13. **Composite Identity Must Be Modeled Explicitly:** do not concatenate ambiguous strings.
14. **Avoid Guessable IDs for Sensitive Enumeration:** authorization remains mandatory even if IDs
    are random.
15. **Never Trust Client-Supplied Ownership IDs Alone:** validate them against authenticated
    identity.

---

# 59. SERIALIZATION AND SCHEMA EVOLUTION PRINCIPLES

1. **Wire Schema Is a Contract:** internal changes must not modify it accidentally.
2. **Additive Changes First:** adding optional fields usually facilitates compatibility.
3. **Unknown Fields Policy:** consumers must define whether they ignore/reject them.
4. **Field Meaning Never Silently Changes:** reusing a name/tag with new semantics breaks contracts.
5. **Do Not Reuse Removed Numeric Tags:** in Protobuf-like formats, reserve removed tags.
6. **Defaults Are Semantics:** absence and a default value may not be equivalent.
7. **Nullability Is Contractual:** `null`, omitted, and empty may have different meanings.
8. **Enums Need Unknown-Value Strategy:** new values may reach old clients.
9. **Canonical Encoding When Signing/Hashing:** serialization must be stable.
10. **Version at the Boundary, Not Every Class:** internal models may evolve freely.
11. **Avoid Serialization of Arbitrary Runtime Objects:** explicit contracts are safer.
12. **Size Limits:** parsers must protect memory/CPU.
13. **Depth Limits:** avoid malicious recursive objects.
14. **Parser Is a Security Boundary:** treat data as untrusted.
15. **Round-Trip Semantics:** serialize→deserialize must preserve promised information.
16. **Locale-Independent Formats:** numbers/dates must not use implicit locale on the wire.
17. **Units in Schema:** avoid ambiguous fields such as `timeout: 30` without a unit.
18. **Migration Tests:** read old data with new code and vice versa according to the compatibility
    window.
19. **Schema Documentation Is Machine- and Human-Readable Where Possible:** combine IDL/JSON
    Schema/OpenAPI with semantic explanation.

---

# 64. DECOMMISSIONING AND RETIREMENT PRINCIPLES

1. **Every Component Has a Lifecycle:** creation, adoption, maintenance, and retirement.
2. **Deprecate First:** provide an alternative and a window.
3. **Stop New Adoption:** mark the component as not recommended.
4. **Migration Path:** provide instructions/tools.
5. **Archive Decision/Docs:** preserve useful history without confusing it with the active system.
6. **Dependency Cleanup:** remove associated libraries/clients.
7. **Sunset Ownership:** someone must be responsible for retirement until it is complete.

---

# 65. LARGE-SCALE CHANGE AND ROLLOUT PRINCIPLES

1. **Small Cohorts First:** test with a representative subset.
2. **Canary:** expand only with healthy signals.
3. **Progressive Delivery:** control exposure independently from deployment.
4. **Abort Criteria Predefined:** decide in advance what evidence requires stopping.
5. **Rollback Path Tested:** do not discover it during an incident.
6. **Roll Forward When State Is Irreversible:** have a compatible patch.
7. **Compatibility Window:** versions N/N-1 must coexist according to strategy.
8. **Feature Flags Need Consistent Evaluation:** prevent users from bouncing between incompatible
   variants.
9. **Observability before Rollout:** if it cannot be measured, it cannot be deployed safely.
10. **Post-Rollout Cleanup:** remove flags, old code, and temporary compatibility.

---

# 68. CONTRACT DOCUMENTATION PRINCIPLES

1. **Semantics before Syntax:** describe meaning, not just types.
2. **Preconditions:** what the consumer must satisfy.
3. **Postconditions:** what the provider guarantees.
4. **Invariants:** what remains true.
5. **Failure Modes:** what errors are possible.
6. **Idempotency:** whether repetition is safe.
7. **Ordering:** whether a guarantee exists.
8. **Consistency:** what version of data may be observed.
9. **Latency/Timeout Expectations:** relevant limits.
10. **Versioning Policy:** how it evolves.
11. **Deprecation Policy:** how it is retired.
12. **Examples:** common paths and edges.
13. **Ownership/Contact:** who is responsible.
14. **Human Rationale:** an IDL does not explain business rules.
15. **Contract Tests:** critical documentation must have verification.

---

# 70. EXTERNAL DEPENDENCY PRINCIPLES

1. **Assume Dependency Failure:** timeout, error, invalid data, and rate limits are normal.
2. **Contract Boundary:** adapt the provider to the internal model.
3. **Anti-Corruption Layer:** avoid excessive semantic dependency.
4. **Timeout:** never wait indefinitely.
5. **Retry Policy:** only transient failures and safe operations.
6. **Rate Limit Awareness:** respect limits and backoff.
7. **Fallback by Product Semantics:** a correct alternative, not an invented response.
8. **Contract Tests/Sandbox:** detect changes.
9. **Version Pinning:** avoid surprise upgrades.
10. **Exit Strategy:** export/migration if risk justifies it.
11. **Secrets/Keys Rotatable:** do not hardcode.
12. **Provider-Specific Types at Edge:** minimize spread when volatility is high.
13. **Cost/Latency of Provider Is Architecture:** do not treat SaaS as free/instantaneous.

---

# 71. LOGGING AND AUDIT EVENT PRINCIPLES

1. **Structured Events:** consistent fields facilitate analysis.
2. **Semantic Event Names:** describe the fact, not an arbitrary text message.
3. **Severity Has Meaning:** ERROR/WARN/INFO/DEBUG with a coherent policy.
4. **No Secrets:** never tokens/passwords.
5. **PII Minimization:** redaction/hash/tokenization according to need.
6. **Correlation IDs:** link requests/workflows.
7. **Trace IDs:** integrate with tracing.
8. **Timestamp + Timezone/Instant:** clear approximate ordering.
9. **Source/Service Version:** identify the emitter.
10. **Tenant/User Context Only When Legitimate:** enough for diagnosis without overcollection.
11. **Immutable Audit Trail:** different from editable operational logs.
12. **Retention by Purpose:** debug, security, and compliance have different windows.
13. **Sampling Not for Critical Audit:** do not lose events that constitute evidence.
14. **Backpressure:** logging must not bring down the application.
15. **Loss Policy:** decide which logs may be lost under saturation.
16. **Log Injection Protection:** normalize/structure untrusted input.
17. **High-Volume Loops Avoid Verbose Logging:** protect cost.
18. **Error Logs Are Actionable:** include operation and safe context.
19. **One Event, One Meaning:** avoid giant logs containing several ambiguous facts.
20. **Schema Evolution:** dashboards/parsers depend on fields; version important changes.

---

# 72. FRONTEND ARCHITECTURE PRINCIPLES

1. **Component Responsibility:** every component has a clear visual/behavioral purpose.
2. **State Ownership:** hoist state only to the necessary owner.
3. **Presentational vs Stateful Separation Where Useful:** separate rendering and orchestration when
   it reduces complexity.
4. **Domain Logic outside View Components:** UI must not be the only place for critical rules.
5. **Design System:** shared primitives/tokens/components for consistency.
6. **Accessible Components by Default:** semantics/focus/keyboard built in.
7. **Feature Boundaries:** organize by capabilities, not only `components/services/hooks`.
8. **API Client Boundary:** do not scatter direct fetches throughout the UI.
9. **Server State vs Client UI State:** treat them with different lifecycles.
10. **Cache Server State with Explicit Freshness:** do not duplicate it as manual state without
    reason.
11. **Optimistic Updates Need Rollback:** reconcile errors and conflicts.
12. **Lazy Load by Interaction/Route:** defer work that is not required.
13. **Avoid Global Mutable Stores by Default:** use the smallest state scope.
14. **Derived State:** compute it, do not synchronize copies.
15. **Error Boundaries/Isolation:** a component failure should not always bring down the whole app.
16. **Network Cancellation:** cancel obsolete requests.
17. **Form State Has Domain Validation Boundary:** UX validation does not replace backend
    validation.
18. **Frontend Is Untrusted:** never enforce security only on the client.

---

# 75. DATABASE PRINCIPLES

1. **Choose Database by Access Patterns/Invariants:** not by popularity.
2. **Schema Encodes Invariants:** PK, FK, unique, check constraints when correct.
3. **Normalize First, Denormalize Deliberately:** avoid accidental redundancy.
4. **Indexes Follow Queries:** every index speeds reads but costs writes/space.
5. **Avoid Over-Indexing:** measure.
6. **Transactions Are Consistency Tools:** group changes that must be atomic.
7. **Isolation Level Is Explicit:** know the anomalies.
8. **Prepared/Parameterized Queries:** security and planning.
9. **Migrations Are Code:** version, test, and observe them.
10. **Expand/Contract:** compatibility between versions.
11. **Data Retention:** large tables need a lifecycle.
12. **No ORM as Excuse to Ignore SQL/Storage Semantics:** abstractions leak.
13. **ORM Entities Are Not Automatically Domain Entities:** separate models if responsibilities
    differ.

---

# 76. FILESYSTEM AND OBJECT STORAGE PRINCIPLES

2. **Atomic Write Strategy:** write temp + rename when the filesystem supports it.
3. **Path Traversal Defense:** never concatenate untrusted paths without normalization/allowlisting.
4. **File Names Are Not Stable IDs:** names can change/collide.
5. **Content Addressing:** hashes can deduplicate/verify integrity when useful.
6. **Checksums:** validate large transfers.
7. **Encryption and Key Management:** stored data inherits sensitivity.
8. **Temporary Files Need Cleanup:** crash-safe lifecycle.
9. **Permissions/Ownership:** least privilege.
10. **Storage Quotas:** prevent unlimited consumption.

---

# 82. BUILD SYSTEM AND REPRODUCIBILITY PRINCIPLES

1. **Build Is a Pure-ish Function of Declared Inputs:** the same inputs should produce an equivalent
   artifact when possible.
2. **Declare All Inputs:** do not depend on hidden files/state.
3. **Declare All Outputs:** enable caching/incremental builds.
4. **Hermetic Build:** controlled tools/dependencies.
5. **Reproducible Build:** minimize nondeterministic timestamps/order/environment.
6. **Incremental Correctness before Speed:** an incorrect cache is worse than a slow build.
7. **Remote Cache Trust:** verify keys/security.
8. **Parallelize Independent Tasks:** explicit DAG.
9. **No Cyclic Build Dependencies:** modularity.
10. **Dependency Locking:** resolve versions stably.
11. **Toolchain Pinning:** compiler/runtime are part of the input.
12. **Generated Sources Are Deterministic:** avoid random diffs.
13. **Build Logic Is Code:** version/test it.
14. **Convention Plugins:** centralize repeated configuration.
15. **Avoid Copy-Paste Build Scripts:** DRY at build-policy level.
16. **Fast Local Feedback:** build architecture affects productivity.
17. **CI Uses Same Build Entry Point:** avoid pipelines that replicate logic.
18. **Artifact Provenance:** record commit/toolchain/dependencies.
19. **SBOM Generation:** know included components when required.
20. **Clean Build Is a Verification, Not Daily Requirement:** incremental builds must be reliable.

---

# 85. FEATURE DESIGN PRINCIPLES

1. **Capability Has an Owner:** an end-to-end feature needs an owner.
2. **Vertical Slice:** deliver value across layers in increments.
3. **Feature Boundary around Change:** group what changes together.
4. **No Feature Flag without Lifecycle:** a release mechanism does not become permanent architecture
   without a decision.
5. **Feature Is Observable:** success/error/usage.
6. **Feature Is Secure:** permissions and abuse.
7. **Feature Is Accessible:** not a later patch.
8. **Feature Has Failure Semantics:** what happens if a dependency fails.
9. **Feature Has Data Lifecycle:** what data it creates.
10. **Feature Has Rollback/Sunset Path:** be able to remove it.
11. **Feature Performance Budget:** cost per interaction.
12. **Feature Contract Tests:** protected integrations.
13. **Avoid Cross-Cutting Changes for Local Feature:** a sign of a weak boundary.
14. **Feature-Level Configuration:** avoid globals when behavior is local.
15. **Feature-Level Documentation:** relevant decisions nearby.
16. **Feature-Level SLO if Critical:** measure experience.
17. **Experiment before Architecture Expansion:** validate demand before building a large platform.
18. **Delete Failed Features:** do not keep them because of sunk cost.

---

# 86. METRICS AND DECISION QUALITY PRINCIPLES

1. **Measure What Matters:** metrics must answer questions.
2. **Define Numerator/Denominator:** avoid ambiguous rates.
3. **Use Distributions, Not Only Averages:** latency and sizes have tails.
4. **Percentiles Need Enough Samples:** interpret with appropriate statistics.
5. **Correlation Is Not Causation:** simultaneous metrics do not prove cause.
6. **Baseline before Change:** without a reference, improvement cannot be known.
7. **Avoid Vanity Metrics:** volume unrelated to the objective.
8. **Goodhart's Law:** a target metric can be gamed.
9. **Metric Ownership:** someone is responsible for the definition.

---

# 87. REUSE PRINCIPLES

1. **Reuse Is a Dependency:** reuse also couples.
2. **Reuse after Proven Commonality:** avoid abstracting two accidentally similar cases.
3. **Common Reuse Principle:** consumers should not depend on things they do not use.
4. **Stable API for Shared Libraries:** compatibility.
5. **Semantic Cohesion:** a shared library must represent a coherent concept.
6. **No “Shared” Dumping Ground:** avoid cross-cutting coupling.
7. **Copy Can Be Cheaper Than Coupling:** small duplication may be preferable to a false
   abstraction.
8. **DRY Applies to Knowledge, Not Every Line:** do not deduplicate syntax that represents distinct
   concepts.
9. **Reuse by Composition:** combine capabilities.
10. **Service Reuse Has Network Cost:** do not turn a common function into a microservice without
    reason.
11. **Platform Reuse Needs Product Thinking:** shared infrastructure must be usable.
12. **Versioning Is the Price of Reuse across Releases:** consumers evolve differently.
13. **Avoid Premature Generalization:** YAGNI/Rule of Three.
14. **Retire Unused Shared Abstractions:** keeping them has a cost.

---

# 91. INTERNATIONALIZATION AND LOCALIZATION PRINCIPLES

1. **Locale Is Data:** not an implicit global.
2. **Language ≠ Region:** `es` does not determine currency/date.
3. **Timezone Is Separate from Locale:** temporal location is distinct.
4. **Unicode:** text as Unicode end-to-end.
5. **Normalize Only with Purpose:** different Unicode forms may be valid.
6. **Case Folding Is Locale-Sensitive:** do not use naive lowercase for identity.
7. **Pluralization Uses Locale Rules:** do not concatenate “s”.
8. **Message Formatting over String Concatenation:** order changes between languages.
9. **Externalize User-Facing Strings:** translation.
10. **Layout Expands:** reserve space for longer text.
11. **RTL Support:** direction may reverse.
12. **Dates/Numbers/Currency Use Locale-Aware Formatting:** storage and presentation are separate.
13. **Identifiers Are Locale-Neutral:** stable internal keys.
14. **Sorting/Collation Is Contextual:** DB default may not match the user.
15. **Search Normalization:** accents/tokenization according to language.
16. **Fallback Locale:** explicit policy.
17. **Translation Lifecycle:** new strings/versions.
18. **Content Is Not Always Translatable at Runtime:** business data may need localized variants.
19. **Accessibility across Languages:** labels/reading order.
20. **Legal Content May Be Region-Specific:** not merely literal translation.

---

# 92. BINARY, SOURCE, AND BEHAVIORAL COMPATIBILITY PRINCIPLES

1. **Source Compatibility:** a consumer can recompile without changes.
2. **Binary Compatibility:** an existing binary continues linking/running.
3. **Behavioral Compatibility:** observable meaning continues meeting expectations.
4. **Wire Compatibility:** old/new messages interoperate.
5. **Data Compatibility:** old persisted data remains readable.
6. **Semantic Compatibility Is Hardest:** compiling does not prove identical behavior.
7. **Public ABI Is a Contract:** signatures, layouts, symbols.
8. **Default Parameters/Inline Code Can Affect ABI by Language:** understand the toolchain.
9. **Serialization Tags Are ABI-like:** do not reuse them.
10. **Deprecate before Remove:** transition.
11. **Adapters/Shims:** maintain temporary compatibility.
12. **Compatibility Tests:** run representative consumers.
13. **Version Policy:** SemVer or another convention.
14. **Breakage Budget:** major changes must justify their cost.
15. **No Accidental Public API:** minimize exports.
16. **Behavioral Bug Fix Can Be Breaking:** Hyrum's Law; document it.
17. **Long-Lived Clients Require Wider Windows:** mobile/SDKs.
18. **Protocol Negotiation:** incompatible peers must be detected.

---

# 93. RESOURCE LIFECYCLE PRINCIPLES

1. **Acquire/Release Symmetry:** every acquisition has a release.
2. **Ownership:** who closes the resource.
3. **Structured Lifetime:** a resource does not outlive its scope without reason.
4. **RAII/`use`/`defer` Patterns:** automate cleanup according to the language.
5. **Idempotent Close:** closing repeatedly should be safe when possible.
6. **Cancellation Triggers Cleanup:** aborting must not leak resources.
7. **Timeout for Acquisition:** waiting indefinitely for a resource is not acceptable.
8. **Pool Is Bounded:** connections/threads/buffers.
9. **Leak Detection:** metrics/tests.
10. **Backpressure before Resource Exhaustion:** limit work.
11. **Finalizers Are Last Resort:** cleanup must not depend only on GC.
12. **Cancellation-Safe Cleanup:** essential cleanup may need a non-cancellable section.
13. **Ownership Transfers Are Explicit:** moving a resource changes its owner.

---

# 94. MEMORY AND IN-PROCESS DATA ARCHITECTURE PRINCIPLES

1. **Bound Memory:** inputs/caches/queues are not unlimited.
2. **Avoid Accidental Retention:** listeners/closures/caches can prevent GC.
3. **Streaming over Full Materialization:** for large datasets.
4. **Copy Cost Matters:** avoid unnecessary large copies.
5. **Immutability Reduces Sharing Bugs:** with an allocation cost that must be measured.
6. **Pooling Only after Measurement:** manual pools can worsen GC/complexity.
7. **Object Lifetime Awareness:** massive temporaries affect collectors.
8. **Memory Locality:** contiguous structures can improve CPU cache behavior.
9. **Data-Oriented Design for Hot Paths:** organize by access when performance is critical.
10. **Avoid Boxing in Hot Paths Where Relevant:** measure.
11. **Zero-Copy Where It Matters:** buffers/slices with safe ownership.
12. **Memory Safety:** avoid use-after-free/out-of-bounds.
13. **Unsafe Code Is a Boundary:** small, reviewed, and tested.
14. **OOM Is a Failure Mode:** memory-pressure/degradation policies.
15. **Cache Eviction:** LRU/LFU/etc. according to access pattern.
16. **Memory Metrics by Component:** ownership.
17. **Heap Dumps Are Sensitive:** they may contain secrets.
18. **Native Interop Ownership:** KMP/native FFI must clarify who frees memory.

---

# 95. UI PERFORMANCE PRINCIPLES

1. **Frame Budget:** work per frame must fit within the target refresh rate.
2. **Avoid Main-Thread Blocking:** heavy IO/computation off the UI thread.
3. **Minimize Recomposition/Re-render Scope:** update only the necessary subtree.
4. **Stable Identity for Lists:** correct keys avoid churn.
5. **Virtualization/Lazy Lists:** do not render thousands of items outside the viewport.
6. **Image Sizing:** decode/size according to display.
7. **Async Image Loading:** do not block the frame.
8. **Prefetch Carefully:** improves latency at the cost of data/memory.
9. **Startup Budget:** defer nonessential initialization.
10. **Lazy Initialization:** load when needed.
11. **Cache Measured Expensive Work:** do not memoize everything.
12. **Avoid Layout Thrashing:** group DOM/layout reads/writes.
13. **Animation on Appropriate Properties:** avoid expensive work.
14. **Input Latency Is User-Centric:** measure interaction, not only FPS.
15. **Low-End Devices Are Targets if Supported:** representative benchmarking.
16. **Battery/Thermal Effects:** sustained performance can throttle.
17. **Memory Pressure:** images/caches must release memory.
18. **Performance Regression Tests:** critical paths.
19. **Skeleton/Progressive Rendering Is Perception, Not Substitute for Speed:** improve feedback
    without hiding structural slowness.
20. **Accessibility Must Survive Optimization:** do not sacrifice semantics/focus for custom
    rendering.

---

# 100. META-PRINCIPLES FOR USING MAPAS

1. **No Principle Is a Substitute for Context:** applying a principle without understanding the
   problem can produce worse architecture.
2. **Principles Can Conflict:** document priority by system and decision.
3. **Security/Safety/Legal Constraints Can Override Convenience:** risk constraints may override
   simplicity or speed.
4. **Prefer Measurable Formulations:** turn “fast,” “scalable,” and “simple” into verifiable
   objectives.
5. **Distinguish Principle from Pattern:** a principle guides; a pattern proposes a recurring form.
6. **Distinguish Law from Heuristic:** CAP/FLP/Amdahl have formal foundations; KISS/Rule of Three
   are guides.
7. **Distinguish Architecture from Convention:** `One Component per File` is a useful convention,
   not a universal law.
8. **Document Exceptions:** breaking a rule can be correct if the reason and consequence are
   understood.
9. **Automate Enforceable Rules:** dependencies, cycles, compatibility, security, and budgets can be
   verified.
10. **Review Rules Periodically:** a useful rule today may become obsolete.
11. **Prefer Few Strong Constraints over Many Unenforced Rules:** effective governance requires a
    clear signal.
12. **Do Not Optimize Every Quality Attribute Maximally:** choose objectives according to the
    product.
13. **Architecture Is Socio-Technical:** teams, communication, ownership, and processes are part of
    the system.
14. **Architecture Includes Runtime and Operations:** it does not end at code structure.
15. **Architecture Includes Data:** data and its lifecycle are central.
16. **Architecture Includes Failure:** behavior under failure is design, not an exception.
17. **Architecture Includes Evolution:** compatibility, migration, and retirement must exist from
    the beginning.
18. **Architecture Includes Economics:** cost and human capacity are constraints.
19. **Architecture Includes Security, Privacy, Accessibility and Sustainability:** cross-cutting
    attributes must be considered according to context.
20. **MAPAS Is a Catalog, Not a Checklist to Apply Blindly:** select and prioritize principles by
    risk, domain, and evidence.

---

# 107. CRYPTOGRAPHIC PRINCIPLES APPLIED TO ARCHITECTURE

1. **Do Not Invent Cryptography:** use reviewed algorithms/protocols and mature libraries.
2. **Kerckhoffs's Principle:** security depends on key secrecy, not algorithm secrecy.
3. **Authenticated Encryption:** confidentiality without integrity is insufficient for many uses.
4. **Unique Nonces Where Algorithm Requires:** reuse can destroy security.
5. **Key Separation:** different keys for different purposes.
6. **Strong Randomness:** security IDs/tokens/keys require a CSPRNG.
7. **Digital Signatures Provide Authenticity/Integrity, Not Confidentiality:** use the right tool.
8. **Hash Is Not Encryption:** it is not reversible and is not a substitute for protecting secrets.
9. **TLS Certificate Validation Must Be Complete:** hostname, chain, expiry, and policy.
10. **Crypto Agility:** be able to rotate algorithms/keys without rewriting the domain.
11. **Key Rotation:** design coexistence of versions.
12. **Hardware-Backed Keys for High-Value Secrets When Available:** limit extraction.
13. **Never Log Keys/Plaintext Secrets:** observability does not cancel cryptography.

---

# 110. SOFTWARE SUPPLY CHAIN AND SSDF PRINCIPLES

1. **Secure Development Environment:** protect repositories, CI, and credentials.
2. **Protect Source Integrity:** branch protection, reviews, and signatures where appropriate.
3. **Least Privilege CI/CD:** runners and tokens with minimal scope.
4. **Dependency Provenance:** know the origin.
5. **Artifact Provenance:** relate the binary to build/source.
6. **SBOM:** inventory components where useful/required.
7. **Signed Artifacts:** verify integrity/authenticity according to the threat model.
8. **Hermetic/Reproducible Builds:** reduce environmental injection.
9. **Isolated Build Workers:** avoid persistent contamination.
10. **Pin Trusted Actions/Plugins:** CI dependencies are software too.
11. **Secret Scanning:** prevent compromised credentials.
12. **SAST/SCA:** detect classes of defects/vulnerabilities.
13. **DAST/Fuzzing Where Appropriate:** complement static analysis.
14. **Vulnerability Triage:** severity + exploitability + exposure.
15. **Patch Process:** ability to respond quickly.
16. **Compromise Recovery:** rotate secrets, rebuild from a trusted root.
17. **Two-Person Review for Critical Pipeline Changes:** proportional to risk.
18. **Build Attestations:** record who/what built the artifact.
19. **Promotion over Rebuild:** the same artifact between environments.
20. **Third-Party Components Have Lifecycle:** updates and EOL.
21. **Secure Software Development Framework:** integrate security practices throughout the SDLC.
22. **Dependency Confusion/Typosquatting Controls:** trusted namespaces/registries.
23. **No Arbitrary Network during Critical Builds Where Feasible:** reduce external dependencies.
24. **Release Keys Are Crown Jewels:** stronger protection.

---

# 111. THREAT MODELING PRINCIPLES

1. **Identify Assets:** what needs protection.
2. **Identify Actors:** users, admins, attackers, services.
3. **Identify Trust Boundaries:** where the trust level changes.
4. **Map Data Flows:** where data moves.
5. **Enumerate Entry Points:** accessible surfaces.
6. **Enumerate Threats Systematically:** STRIDE or another method.
7. **Prioritize by Risk:** probability/impact/exposure.
8. **Mitigate by Design:** eliminate/reduce the threat before detective controls.
9. **Verify Mitigations:** every control needs test/evidence.
10. **Model Abuse Cases:** think about adversarial goals, not only happy use cases.
11. **Threat Model Changes with Architecture:** review when new boundaries/data appear.
12. **Third Parties Are in the Model:** providers, SDKs, identity providers.
13. **Insiders Are Possible Actors:** do not assume malice is only external.
14. **Availability Is a Security Property:** DoS and resource exhaustion.
15. **Privacy Threats Are Included:** linkability, disclosure, inference.
16. **Supply Chain Is Included:** build/dependencies.
17. **Residual Risk Is Documented:** no control eliminates all risk.
18. **Security Requirements Derive from Threats:** avoid disconnected checklists.
19. **Attack Surface Minimization:** remove unnecessary paths.
20. **Threat Modeling Is Continuous:** not a one-meeting document.

---

# 125. PLUGGABLE STORAGE ARCHITECTURE AND PERSISTENCE ABSTRACTION PRINCIPLES

1. **Least Common Denominator Can Be Too Weak:** a portable abstraction can eliminate valuable
   capabilities.
2. **Capability Interfaces:** expose optional capabilities explicitly.
3. **Do Not Pretend All Datastores Are Equivalent:** transactions, queries, and consistency differ.
4. **Repository for Domain Semantics, Not Generic CRUD:** abstract intent.
5. **Query Specification at Boundary:** avoid leaking SQL/ORM internals if replacement matters.
6. **Escape Hatch:** allow specific optimization without contaminating the entire domain.
7. **Migration Cost Is Data Cost:** replacing a DB involves data, not only an interface.
8. **Dual Storage Requires Reconciliation:** transition is not trivial.
9. **Feature Detection:** consumers check capabilities.
10. **Performance Tests per Backend:** functional equivalence does not imply equivalent performance.
11. **Consistency Contract per Backend:** a common API must provide real minimum semantics.
12. **Transactional Semantics Cannot Be Faked Cheaply:** document differences.
13. **Error Translation:** map failures to stable domain/infrastructure categories.
14. **Observability Includes Backend Identity:** diagnose differences.
15. **Portable Core, Specialized Adapter:** balance independence and capabilities.

---

# 132. SENSITIVE DATA ARCHITECTURE AND TOKENIZATION PRINCIPLES

1. **Classify before Store:** sensitivity drives controls.
2. **Minimize Collection:** do not store if unnecessary.
3. **Field-Level Encryption when Storage/Access Risks Differ:** does not replace authorization.
4. **Masking for Display:** reveal the minimum.
5. **Redaction before Logs/Analytics:** not afterward.
6. **Deletion Includes Vault/Backups/Derived Copies per Policy:** data lineage.
7. **Test Data Must Not Be Production PII by Default:** use synthetic/verified anonymous data.

---

# 135. DOMAIN CONSISTENCY ARCHITECTURE PRINCIPLES

1. **Invariant Has One Authority:** every critical rule has an owner.
2. **Monotonic State Transitions:** workflows may restrict backward transitions.
3. **State Machine Enforces Legal Transitions:** not every enum→enum transition is valid.
4. **Optimistic Conflict Detection:** version.
5. **Command Preconditions:** reject intent against stale state.
6. **Audit Meaningful Transitions:** history.
7. **Domain Consistency Takes Priority over Infrastructure Convenience:** do not adapt a critical
   rule to an accidental limitation without an explicit decision.

---

# 136. FLOW CONTROL AND BACKPRESSURE ARCHITECTURE PRINCIPLES

1. **Producer Rate Cannot Exceed Consumer Capacity Indefinitely:** queueing physics.
2. **Bound Buffers:** finite memory/latency.
3. **Push Needs Demand Signal or Drop Policy:** control pressure.
4. **Pull Naturally Expresses Demand but Adds Polling/Latency:** trade-off.
5. **Credit-Based Flow Control:** the consumer grants capacity explicitly.
6. **Window-Based Flow Control:** limit bytes/messages in flight.
7. **Drop Policy Is Semantic:** newest/oldest/random/priority according to domain.
8. **Coalescing:** combine replaceable updates.
9. **Sampling:** reduce data when accuracy allows.
10. **Adaptive Concurrency:** adjust in-flight requests according to latency/error.
11. **Queue Length Alone Is Incomplete:** measure age and service time.
12. **Backpressure Propagates Upstream:** do not absorb indefinitely in one layer.
13. **Protect Critical Work with Priority/Isolation:** bulkheads.
14. **Load Shedding Is Better than Collapse:** reject in a controlled way.
15. **Retry Traffic Is Load:** include it in capacity.
16. **Admission before Allocation:** do not reserve expensive resources before accepting.

---

# 146. IDENTITY FEDERATION, OAUTH, AND OIDC PRINCIPLES

1. **Authentication and Authorization Are Different:** proving identity does not automatically grant
   permissions.
2. **OAuth Is Delegated Authorization:** do not use an access token as an arbitrary substitute for
   identity.
3. **OIDC Adds Identity Semantics:** federated authentication requires explicit identity semantics.
4. **Validate Issuer:** accept tokens only from trusted issuers.
5. **Validate Audience:** a token must be used only for its intended recipient.
6. **Validate Expiry and Not-Before:** time is part of the security contract.
7. **Validate Signature and Algorithm Policy:** do not trust unrestricted algorithm selection.
8. **Authorization Code + PKCE for Public Clients:** avoid secrets that cannot be protected in
   public clients.
9. **No Client Secret in Mobile/SPA:** a secret distributed to the user is no longer secret.
10. **State/Nonce Bind Flows:** prevent mix-up, replay, and CSRF according to the flow.
11. **Redirect URIs Must Be Constrained:** do not accept arbitrary destinations.
12. **Least-Privilege Scopes:** request only necessary permissions.
13. **Short-Lived Access Tokens:** limit the abuse window.
14. **Refresh Tokens Need Stronger Protection:** they enable long sessions.
15. **Refresh Token Rotation Where Appropriate:** detect/reduce replay.
16. **Token Revocation Is Not Instant Everywhere:** design expectations around caching and
    propagation.
17. **Key Rotation:** consumers must tolerate key rotation.
18. **JWKS Caching with Refresh:** avoid a per-request dependency without keeping keys forever.
19. **Claims Are Data from an Issuer:** validate meaning, not only signature.
20. **Do Not Encode Mutable Authorization Forever in Long-Lived Tokens:** permissions change.
21. **Session ≠ Token:** manage both lifecycles consciously.
22. **Logout Is Multi-Party in Federation:** local logout may not end the provider session.
23. **Account Linking Is Security-Critical:** do not merge identities based on weak matches.

---

# 149. DESKTOP AND LOCAL PROCESS ARCHITECTURE PRINCIPLES

1. **Process Boundaries Are Security Boundaries Only When Enforced:** separating processes is not
   enough without permissions/secure IPC.
2. **UI Thread Must Stay Responsive:** blocking work off the interface thread.
3. **Crash Isolation:** extensions or risky work may require separate processes.
4. **Single Instance Is a Policy:** define what happens with multiple instances.
5. **Local Persistence Needs Migration:** installed applications survive many versions.
6. **Offline Is the Default Failure Mode:** the network may be completely absent.
7. **Filesystem Is User Territory:** paths, permissions, and user data must be respected.
8. **Atomic Update:** an update must not leave the installation corrupted.
9. **Rollback:** be able to revert when an update fails.
10. **Code Signing:** verify the provenance and integrity of binaries.
11. **Auto-Update Is a Security-Critical Pipeline:** authentication, signing, and secure channel.
12. **OS Integration Behind Adapters:** isolate Windows/macOS/Linux differences.
13. **Resource Lifetime:** windows, processes, sockets, and handles must be closed.
14. **Suspend/Resume:** persist and recover state appropriately.
15. **Multiple Displays/DPI:** UI must not assume a fixed resolution.
16. **Local IPC Needs Authentication/Authorization When Sensitive:** “local” does not mean trusted.
17. **Plugin Sandboxing:** third-party extensions must not inherit unnecessary authority.
18. **User Data Portability:** export/migrate data when the product requires it.
19. **Uninstall Semantics:** distinguish binaries, cache, configuration, and user data.
20. **Telemetry Must Respect Consent and Connectivity:** desktop can operate without a backend.

---

# 150. MAPAS TAXONOMIC CLOSURE PRINCIPLES

1. **Universality by Architectural Concern:** MAPAS catalogs reusable architectural concerns, not
   every particular rule of every industry.
2. **Sector Profiles Are Compositions:** fintech, healthtech, gaming, telecom, aerospace, etc.
   combine universal principles and regulatory/sector constraints.
3. **A New Principle Must Introduce a Distinct Architectural Constraint, Trade-off or
   Responsibility:** a new name without new semantics does not create a category.
4. **Aliases Are Not New Principles:** synonyms are preserved as references, not as independent
   concepts.
5. **Patterns Are Distinguished from Principles:** a pattern is a recurring solution; the principle
   explains the force or constraint that may justify it.
6. **Practices Are Distinguished from Principles:** a practice operationalizes a principle but is
   not necessarily universal.
7. **Laws/Theorems Are Distinguished from Heuristics:** a demonstrated limitation does not have the
   same status as an empirical rule.
8. **Quality Attributes Are Architectural Drivers:** performance, security, modifiability,
   availability, etc. generate decisions and trade-offs.
9. **Context Governs Applicability:** no operational principle should be imposed without considering
   requirements and constraints.
10. **Trade-offs Must Be Explicit:** optimizing one property can degrade another.
11. **Contradictions Are Resolved by Architecture Drivers:** for example, DRY may yield to
    decoupling; consistency may yield to availability; abstraction may yield to simplicity.
12. **Evidence Beats Fashion:** adopt techniques for demonstrated properties or observed needs, not
    trendiness.
13. **Reversibility Determines Decision Cost:** decisions that are hard to reverse require more
    evidence and documentation.
14. **Architecture Is Continuous:** the catalog is used during design, implementation, operation,
    and evolution.
15. **No Technology Is a Principle:** Kotlin, Kubernetes, Kafka, PostgreSQL, React, etc. are
    choices; principles explain why they might be chosen.
16. **No Pattern Is Mandatory Globally:** CQRS, event sourcing, microservices, clean architecture,
    etc. apply only when their trade-offs are acceptable.
17. **Principle Conflicts Must Be Recorded:** when two rules compete, the decision must state which
    dominates and why.
18. **Exceptions Need Scope:** an architectural exception must indicate component, reason, risk, and
    review date/condition.
19. **Architectural Fitness Can Be Automated:** verifiable rules should become tests, linters,
    dependency checks, policy-as-code, or metrics when cost-effective.
20. **The Catalog Is Open but Versioned:** new evidence may expand MAPAS without silently rewriting
    previous versions.
