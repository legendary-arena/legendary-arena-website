# Marvel Action Figure Diorama — Master Plan

**Project:** Legendary Arena Diorama Platform
**Site:** legendary-arena.com
**Last Updated:** June 6, 2026

---

## Table of Contents

1. [Vision](#vision)
2. [Overview](#overview)
3. [Themed Scenes](#themed-scenes)
4. [Key Components](#key-components)
   - Display Frame
   - Figures & Posing (Rigging System)
   - Electrical System (Lighting & Motion)
5. [Audio System](#audio-system)
6. [Backdrop Display](#backdrop-display)
7. [Controller](#controller)
8. [Use Cases & Display Modes](#use-cases--display-modes)
9. [Business Model — Legendary Arena Marketplace](#business-model)
10. [STEM Education Platform](#stem-education-platform)
11. [Gaps & Additional Considerations](#gaps--additional-considerations)
12. [Future Ideas](#future-ideas)
13. [Work Tasks & Priorities](#work-tasks--priorities)
14. [Open Questions](#open-questions)

---

## 1. Vision

**No margin, no mission.**

This project exists at the intersection of creativity, education, and commerce. The margin funds the mission — and the mission is to put something meaningful into the hands of families, students, and Marvel fans.

**What we're building:**
A one-stop platform at legendary-arena.com where anyone can purchase a kit and build a Marvel action figure diorama — complete with LED lighting, motorized movement, synchronized sound, and digital backdrops — all controlled by a Raspberry Pi.

**Why it matters:**

- **For families:** A Saturday afternoon project that a parent and child build together. The finished diorama sits on a bookshelf as proof of time well spent. The product is the memory, not the box.
- **For students:** A hands-on STEM learning platform that teaches mechanical engineering, electrical engineering, and programming through something genuinely exciting — not another blinking LED on a breadboard, but Spider-Man swinging through a lit-up alley with a soundtrack.
- **For collectors and fans:** A display system that brings action figures to life in ways a shelf never could — motion, light, sound, and themed environments.
- **For the business:** Every sale funds the next iteration. Revenue from kits, accessories, digital products, and educational materials sustains the development of better tools, better curriculum, and a growing community around legendary-arena.com.

**Guiding principles:**

- Start lean. Ship the first kit before perfecting the tenth.
- Build what you can sell. Sell what you can build.
- Every dollar of margin enables the mission to reach one more family, one more classroom, one more kid who discovers they love engineering because Spider-Man's eyes lit up and they made it happen.
- Take personal accountability for quality — if it ships, it works.

### It All Started with a Game

Walt Disney once said it all started with a mouse. For Legendary Arena, it all started with a game — and a friendship.

During a difficult season — a divorce that left him starting over, with a pension for future money and no place to live — Jeff's friend Tex extended a hand. He opened his home, rented Jeff a room while he got back on his feet, and invited him over to play a card game: Legendary, the Marvel deck-building game. It wasn't really about the game. It was about a friend saying, "Come sit at my table. You're not alone."

That simple act of kindness — a place to stay, a seat at the table — planted a seed. The game nights became a refuge. Not a bar, not an escape into something destructive, but something constructive: two friends sitting across from each other, shuffling cards, talking through life. The way men have always needed spaces to just *be* — doing something with their hands, shoulder to shoulder, working through things without having to name them.

From those game nights came ideas. From the ideas came Legendary Arena — a web platform, a companion app, a growing community. And from Legendary Arena came this: the diorama project. A physical, tangible thing that a grandfather can build with his grandchildren on a Saturday afternoon. Something that could help those grandchildren earn money for their missions. Something that could grow into a tool for other friendships, other families — fathers and sons, fathers and daughters, friends helping friends through hard seasons.

The vision isn't limited to Marvel. The same diorama concept works with Barbie dolls, historical figures, or anything a family wants to build together. The characters on the shelf are just the excuse. The real product has always been the time spent together.

Jeff believes he was guided here — that through prayer and the inspiration of the Holy Ghost, this path unfolded not by accident but by design. That a painful chapter became the foundation for something that could bless other people's relationships the way Tex's friendship blessed his.

**The end result isn't the display on the bookshelf. The end result is the bond between the people who built it.**

This is the story behind the brand. It started with a helping hand from a friend when things were at their lowest. It grew through faith, persistence, and a willingness to build something from nothing. And it continues with the belief that if this project can bring one father and son closer together over a Saturday afternoon, it was worth every hour poured into it.

---

## 2. Overview

A custom-built **diorama** display frame featuring Marvel superhero figures posed in dynamic action scenes (flying, fighting, etc.), using magnets for both physical mounting and electrical connectivity to power integrated LED lighting. Each diorama follows a specific theme with characters and backdrops matched to the setting.

The system is modular: figures can be repositioned freely, LEDs activate on magnetic contact, servos animate select figures, and a Raspberry Pi orchestrates lighting, motion, sound, and digital backdrops — all from one controller.

### Why a Diorama? The Model Railroad Problem

In the 1960s and 70s, model railroading was the hobby. Dads and sons would build elaborate HO-scale towns — mountains, tunnels, buildings, tiny streetlights — and run trains through them for hours. It was creative, hands-on, multi-generational, and deeply satisfying. That desire hasn't gone away. Men still want to build miniature worlds. The problem is real estate.

A proper model railroad layout takes over an entire room — a 4×8 table minimum, often larger. Most families don't have a spare room to dedicate to a permanent hobby layout. The result is that the hobby has shrunk to a niche of older enthusiasts with the space and budget for it, while the underlying desire — to build something detailed, mechanical, and alive with motion and light — goes unmet for everyone else.

The bookshelf diorama solves this. It delivers the same creative satisfaction in a 12–16 inch footprint that sits on a shelf you already own. No dedicated room. No permanent table. No explaining to your spouse why the guest bedroom is now a train yard. You get the building experience, the mechanical and electrical tinkering, the pride of display — all contained in something you can pick up with two hands.

**Model railroad vs. bookshelf diorama:**
- Railroad: needs a whole room → Diorama: fits on a bookshelf
- Railroad: thousands of dollars to start → Diorama: ~$100 starter kit
- Railroad: months or years to build → Diorama: one Saturday afternoon
- Railroad: static once built (train runs the same loop) → Diorama: figures can be repositioned, scenes changed, software updated
- Railroad: limited appeal to younger kids → Diorama: Marvel superheroes have instant kid buy-in
- Railroad: solo hobby for most → Diorama: designed as a parent-child build project

The diorama doesn't replace model railroading — it captures the spirit of it and makes it accessible to a generation that doesn't have a spare room but still wants to build something with their hands.

---

## 3. Themed Scenes

### Space
- **Characters:** Silver Surfer, Galactus, and other cosmic heroes/villains
- **Backdrop ideas:** Starfield, planets, nebula effects
- **Lighting:** Cool blues, purples, and white LEDs for a cosmic glow

### Street / Alley
- **Characters:** Spider-Man, Daredevil, and other street-level heroes
- **Backdrop ideas:** Brick walls, fire escapes, dumpsters, streetlights
- **Lighting:** Warm yellows and oranges for streetlight ambiance, maybe red for Daredevil's Hell's Kitchen vibe

### Underwater / Aquarium (Dual-Purpose Diorama)
- **Characters:** Sub-Mariner (Namor), Little Mermaid, Aquaman, or any aquatic figures
- **Concept:** A sealed aquarium tank that doubles as a living diorama — real water, real fish, with action figures rigged inside or mounted to the exterior
- **Backdrop ideas:** Coral reef, sunken city (Atlantis), shipwreck, ocean floor
- **Lighting:** Waterproof blue and green LEDs, ripple/caustic light effects projected from above

**The Tank:**
A small desktop aquarium (3–5 gallon nano tank) serves as the diorama enclosure. Rectangular shape works best for a "scene" layout — front viewing, backdrop on the rear glass. Tanks this size are common and affordable (~$20–50).

**Figures Inside the Tank:**
Action figures sealed with a waterproof clear coat (marine-grade polyurethane or epoxy resin) to prevent paint degradation. Mounted using aquarium-safe suction cups or weighted magnetic bases. External magnets on the outside of the glass hold internal magnetic mounts in place — figures can be repositioned without reaching into the water. Armature wire (stainless steel to prevent rust) can pose figures in swimming or diving positions. Clear monofilament doubles as fishing line — literally designed for underwater use.

**Figures Outside the Tank (Easier Alternative):**
Mount figures to the exterior glass using magnetic clamps. They appear to be "in" the water when viewed from certain angles. No waterproofing needed. Could mix both approaches: Namor inside the tank, surface heroes mounted outside looking in.

**Live Fish:**
Small, low-maintenance species suited to nano tanks: betta fish, neon tetras, shrimp, or snails. Fish swimming around the figures brings the scene to life in a way no motor can replicate. Requires a small filter, heater (for tropical species), and regular water changes. Avoid sharp edges on any mounted figures or wire — fish safety first.

**Aquarium Lighting:**
Waterproof LED strips rated IP67 or IP68 designed for submersion. Colors: blue and white for deep ocean, green for murky/swamp, purple for Atlantis mystique. The Pi controls color and brightness via MOSFET. A top-mounted LED with a ripple lens can project caustic light patterns (the dancing light reflections you see at the bottom of pools).

**Aquarium Backdrop:**
Print a high-res underwater scene on vinyl and adhere to the rear glass (standard aquarium technique), or mount the LCD screen behind the tank for animated fish, drifting kelp, and rising bubbles. The water itself adds a natural distortion layer that makes the screen backdrop look more immersive.

**Aquarium Motion:**
External magnets moved slowly along the outside of the glass can drag internal magnetic figures through the water — Namor "swimming" across the scene. A small aquarium air pump creates rising bubbles. A tiny submersible water pump (~$5) can create gentle current, making monofilament-suspended figures sway naturally.

**Safety Considerations:**
All electronics must be outside the tank or rated for submersion (IP67/IP68). No exposed wiring inside the tank. Use a GFCI outlet or adapter for any power near water. Magnetic contacts through glass only — the glass acts as a natural insulator. Ensure all materials inside the tank are aquarium-safe (no zinc, copper, or lead-based paints). Regular water testing if live fish are present.

### Future Themes (TBD)
- Asgard (Thor, Loki)
- Wakanda (Black Panther)
- Avengers Tower / battlefield

---

## 4. Key Components

### 4.1 Display Frame

- Metal frame structure serving as the base and backdrop
- Acts as both a mounting surface and part of the electrical circuit
- Could include a floor plate and a vertical back wall, both metallic
- Flat-pack design (bolts together like IKEA), sized to fit a standard bookshelf (~12"–16" wide)
- Pre-drilled holes for servo mounts, wire routing, and speaker placement

### 4.2 Figures & Posing (Rigging System)

Marvel superhero action figures arranged in mid-action poses using a modular magnetic attachment system. Each accessory doubles as a magnet mount and an LED power contact.

**Magnetic Boots (Standing & Landing Poses)**
Small neodymium magnets embedded in custom-fitted boot caps or sole plates. Snaps the figure upright onto the metal floor or wall. Works for standing, crouching, or landing poses (e.g., Black Panther landing, Iron Man touching down). Could be sculpted from epoxy putty or 3D printed to match each figure's footwear.

**Magnetic Belt / Waist Harness (Flying & Hovering Poses)**
A thin band or clip around the figure's waist with a magnet on the back. Attaches to the metal back wall so the figure appears to be flying or hovering. A small ball-and-socket joint between the magnet and the belt could allow tilt and rotation. Great for Silver Surfer, Iron Man, Thor.

**Magnetic Glove / Wrist Mount (Swinging & Reaching Poses)**
A magnetic cap or cuff fitted over one hand or wrist. The figure hangs from the ceiling or top of the frame by one arm. Perfect for Spider-Man swinging from a web. Clear monofilament line can simulate a web line or grapple cable.

**Magnetic Back Plate (Wall-Crawling & Clinging Poses)**
A flat magnetic plate adhered to the figure's back, hidden from the front view. Lets the figure "cling" to a vertical metal surface. Ideal for Spider-Man wall-crawling or Venom creeping down a wall.

**Suspension Lines**
Clear monofilament fishing line for additional support on complex poses. Nearly invisible against most backdrops. Attach to the frame's top rail with small hooks or eyelets.

**Armature Wire Supports (Static Poseable Rigging)**
Inspired by the bendable wire inside classic **Gumby** toys — known as armature wire. Heavy-gauge aluminum or annealed steel wire that holds its shape once bent. Can be shaped into custom support arms: bend to the exact angle needed, and it stays put. Attach the wire to the metal frame at one end (soldered, clamped, or magnetically) and the figure at the other end using small clear plastic clips. The wire can be wrapped in heat-shrink tubing or painted to blend with the backdrop. Also used in professional stop-motion animation — proven technique. Advantages over fishing line: supports heavier figures, holds precise angles, no sagging over time.

**Armature Wire + Servo Hybrid (Poseable & Animated Rigging)**
Combines the flexibility of armature wire with motorized movement — one rig that can be both a static pose holder and an animated arm.

How it works: a small micro servo motor (e.g., SG90) is mounted to the metal frame, hidden behind the backdrop or inside the base. An armature wire arm extends from the servo's horn. The figure is clipped to the far end using a clear plastic clamp. The wire can be bent into any shape. When the servo activates, it sweeps the entire wire arm through a range of motion, carrying the figure with it.

Movement patterns:
- **Sweep arc** — servo rotates 90°–180°, swinging the figure in a wide arc (Spider-Man swinging between buildings)
- **Slow scan** — servo moves just 20°–30° back and forth slowly (Silver Surfer gliding across the sky)
- **Bobbing hover** — very small 5°–10° oscillation at moderate speed (Iron Man hovering in place)
- **Hit-and-return** — fast sweep out, slow return (a punch or dive-bomb attack)

Wiring the LED through the arm: run thin enameled magnet wire (30–32 gauge) along the armature wire, secured with tiny dabs of clear adhesive or heat-shrink tubing. The wire carries power from the frame to the LED on the figure. Result: the figure lights up AND moves — no batteries on the figure itself.

Mounting options: servo behind the back wall with the arm poking through a slot, servo inside the base platform with the arm reaching up, or multiple servos for multi-figure choreography.

Control: a single Arduino Nano can drive 6–8 servos independently. Each servo can be programmed with its own movement pattern and speed. Patterns can be synced — one figure chases another, or multiple figures orbit a central villain. A potentiometer on the base lets you adjust speed manually. Add a button or motion sensor to trigger movement on demand.

### 4.3 Electrical System

The electrical system has two subsystems: **lighting** and **motion**. Both use the metal frame and magnetic contacts to deliver power, keeping wiring hidden and figures repositionable.

#### A. Lighting (LED System)

LED lights embedded in or attached to each figure. Each LED connection point uses magnets as electrical contacts. When a magnetized LED base makes contact with the metal frame (wall or floor), the circuit completes and the light turns on. Inspiration: similar in concept to a **Lite-Brite** toy, where pegs complete a circuit to light up — but here, magnets replace the pegs and the metal frame replaces the board.

**Lighting ideas by theme:**
- Iron Man — glowing repulsor hands, arc reactor chest light
- Spider-Man — LED eyes on the mask
- Silver Surfer — soft underglow on the board
- Galactus — glowing helmet or eyes
- Daredevil — red ambient glow from behind the figure
- Background LEDs — hidden strip lighting behind the backdrop for mood

**LED types to consider:**
- Pre-wired SMD LEDs (tiny, easy to hide inside figures)
- Fiber optic strands for pinpoint glow effects (eyes, fingertips)
- LED strip lights for backdrop and edge lighting

#### B. Motion (Motorized Movement)

Adds dynamic movement to select figures, giving the impression of flight, combat, or patrol.

**Rotation:** A small low-RPM gear motor or servo mounted behind or beneath the frame. A turntable or rotating arm spins a figure slowly. Great for characters in flight orbit (e.g., Silver Surfer circling Galactus).

**Back-and-forth / linear motion:** A small slider mechanism (rack and pinion, or crank arm) moves a figure along a track — forward and back or side to side. Simulates a character flying across the scene. Could use a hidden rail or slot in the frame's back wall.

**Oscillating / pendulum motion:** A pendulum arm powered by a small motor. The figure swings in an arc — perfect for Spider-Man web-swinging. Can be combined with monofilament "web line" for visual effect.

**Motion control options:** Continuous slow movement using low-RPM DC motors, timed or triggered movement using a microcontroller, sound-activated or button-activated for interactive display, speed control via potentiometer dial on the frame's base.

#### C. Advanced Mechanical Motion Systems

These mechanisms go beyond simple servo sweeps into real mechanical engineering concepts. Each one is both functional for the diorama AND educational — students learn how the mechanism works by building and watching it operate.

---

**GEARS**

**Geneva Mechanism (Intermittent / Stop-and-Go Motion)**
This is likely the "spider gear" — a cross-shaped driven wheel that rotates in precise, evenly spaced steps rather than continuously. A spinning drive wheel has a single pin that catches one slot of the cross, rotates it exactly 90°, then releases. The result is a repeating pattern: move, pause, move, pause.

Diorama use: A turntable that rotates a figure, pauses for 2 seconds (for viewing), then rotates again. Perfect for a display mode where each side of a figure is shown in sequence. Or mount four figures on a Geneva turntable — each one rotates into the "spotlight" position and holds.

Educational value: Teaches intermittent motion, gear ratios, and timing without electronics.

**Worm Gear (Extreme Speed Reduction)**
A screw-shaped gear (the worm) meshes with a standard gear wheel. One full rotation of the worm advances the wheel by just one tooth. This creates massive speed reduction and is self-locking — the wheel can't back-drive the worm, so the figure holds position when the motor stops.

Diorama use: Slow, dramatic rotation of a large figure like Galactus. A fast motor spinning the worm results in extremely slow, smooth rotation of the figure platform. Also useful for slowly raising or lowering a figure (vertical worm drive) — Iron Man ascending.

Educational value: Teaches gear ratios, mechanical advantage, and self-locking principles.

**Bevel Gears (Change Direction of Rotation)**
Two cone-shaped gears meshed at a 90° angle. A horizontal motor shaft can drive a vertical output shaft, or vice versa.

Diorama use: A motor hidden flat inside the base drives a vertical rotating arm through a bevel gear set. The figure spins on a vertical axis while the motor stays hidden horizontally. Allows compact, hidden motor placement.

Educational value: Teaches how to redirect force and motion through angles.

**Rack and Pinion (Rotation to Linear Motion)**
A circular gear (pinion) meshes with a flat toothed bar (rack). Rotating the pinion slides the rack in a straight line.

Diorama use: A figure mounted on the rack slides left-right or up-down across the scene — Spider-Man zipping across on a web line, or a figure rising from behind a building. Reverse the motor to go back. Very precise, no slop.

Educational value: Teaches conversion of rotational to linear motion. This is how car steering works.

**Planetary Gears (Compound Speed/Direction Control)**
A central sun gear surrounded by planet gears inside a ring gear. By holding different parts fixed, you get different speed ratios and directions from the same input.

Diorama use: Advanced — two figures orbiting at different speeds from a single motor (one on the sun gear, one on the planet carrier). Galactus standing still while Silver Surfer orbits and a smaller figure orbits at a different speed.

Educational value: Teaches compound gear trains, the concept of a carrier, and real-world applications (automatic transmissions, drills).

---

**SPRINGS**

**Tension Springs (Pull-Back Action)**
A coiled spring that resists being stretched. When released, it snaps back to its original length.

Diorama use: A figure on a pull-back arm — pull Spider-Man back, release, and he springs forward toward the scene (web-slinging lunge). A latch or cam can cock and release the spring automatically via a motor.

Educational value: Teaches stored elastic potential energy, Hooke's law (force proportional to displacement), and energy conversion.

**Compression Springs (Pop-Up Action)**
A coiled spring that resists being compressed. When released, it pushes outward.

Diorama use: A figure hidden below the base level — the spring pops them up into view. Think of a jack-in-the-box effect. The Hulk bursting up through the ground, or a villain appearing from behind a wall. A motor-driven cam can compress and release the spring on a cycle.

Educational value: Teaches compression vs tension, spring constants, and potential energy storage.

**Torsion Springs (Rotational Snap)**
A spring that stores energy when twisted, like a mousetrap or a clothespin.

Diorama use: A figure's arm swings and strikes — cocked by a motor or cam, then released by a trigger. A punching motion, a hammer swing (Thor), or a throwing action. Quick, snappy motion that looks dynamic.

Educational value: Teaches rotational energy storage, torque, and trigger/release mechanisms.

---

**LEVERS**

**First-Class Lever (Seesaw — Fulcrum in the Middle)**
Load on one end, effort on the other, fulcrum in the center. Like a seesaw or a crowbar.

Diorama use: Two figures on opposite ends — one goes up as the other goes down. A fight scene where one hero slams down and the villain flies up. A motor or cam pushes one end down cyclically.

Educational value: The classic simple machine. Teaches mechanical advantage, fulcrum placement, and force multiplication.

**Second-Class Lever (Wheelbarrow — Load in the Middle)**
Fulcrum at one end, effort at the other, load between them.

Diorama use: A drawbridge or ramp that lifts — a figure stands on the ramp (load), a motor pulls the far end (effort), and the hinge at the base is the fulcrum. Castle gate opening for Asgard theme.

Educational value: Teaches how load position affects effort required.

**Third-Class Lever (Tweezers — Effort in the Middle)**
Fulcrum at one end, load at the far end, effort applied between them. Amplifies speed and distance at the cost of force — like a human arm.

Diorama use: A figure's arm is a third-class lever — a servo at the "elbow" (effort in the middle) swings the fist (load at the end) fast and far. Exaggerated punching or throwing motion.

Educational value: Teaches how the human body uses levers, and the trade-off between force and speed.

---

**LINKAGES**

**Four-Bar Linkage (Complex Path Motion)**
Four rigid bars connected in a loop with pivot joints. By driving one bar, the others trace complex, repeating paths — curves, figure-eights, or rocking motions.

Diorama use: A figure's legs "walk" using a four-bar linkage driven by a motor. Or a figure's arms swing in a natural arc. Theo Jansen–style walking mechanisms could make a figure appear to stride across the scene.

Educational value: Teaches mechanical linkages, degrees of freedom, and path tracing. This is how many real machines convert simple rotation into complex motion.

**Crank-Slider (Rotation to Back-and-Forth)**
A rotating crank arm connected to a sliding bar via a connecting rod. The rotation becomes smooth linear reciprocation — like a piston in an engine.

Diorama use: A figure punches forward and retracts, forward and retracts, on a smooth repeating cycle. Or a figure ducks behind cover and pops back up. Very smooth, very mechanical.

Educational value: Teaches how engines convert rotation to linear motion (or vice versa). The basis of steam engines and internal combustion.

---

**HYDRAULICS (Syringe Hydraulics)**

Syringe-based hydraulics are one of the most popular STEM education tools — cheap, visual, and dramatic. Two syringes connected by a tube filled with water. Push one plunger, the other extends. It's real hydraulics at tabletop scale.

**How It Works:**
Two plastic syringes (10–20 mL) connected by clear vinyl tubing filled with water (no air bubbles). Pushing the plunger on syringe A forces water through the tube, extending the plunger on syringe B. The force transfer is visible through the clear tubing.

**Diorama use:**
- A figure's arm or leg moves when you push a syringe plunger hidden in the base — direct, tactile, no electronics needed
- A platform rises (Hulk emerging from rubble) when a syringe is depressed
- A drawbridge lowers (Asgard gate) using hydraulic actuation
- Could be motorized: a servo pushes syringe A's plunger, syringe B's plunger moves the figure
- Multiple syringes for multiple degrees of freedom — one for the arm, one for the head, one for the body tilt

**Why It's Great for Education:**
- Visible force transfer — students see the water move through the tube
- Teaches Pascal's law (pressure applied to a fluid is transmitted equally in all directions)
- Using different sized syringes demonstrates hydraulic advantage (small syringe to large syringe = force multiplication, large to small = speed multiplication)
- No electricity required for the basic version — pure mechanical/fluid power
- Extremely cheap: a pack of 10 syringes + tubing costs ~$5

**Materials for prototype:**
- Plastic syringes (10mL and 20mL, no needle) — ~$5 for a pack
- Clear vinyl tubing (4mm ID to fit syringe tips) — ~$4
- Water + a drop of food coloring (makes the fluid visible in the tube)
- Small mounting brackets or zip ties to secure syringes to the frame

---

**PULLEYS**

**Simple Pulley (Direction Change)**
A wheel on an axle with a rope around it. Pulling down on one side lifts the other side.

Diorama use: A figure is "hoisted" up — pull a thread at the base, and Spider-Man rises to the ceiling. A motor winds the thread around a spool.

Educational value: Teaches direction of force and basic mechanical advantage.

**Compound Pulley (Force Multiplication)**
Multiple pulleys working together. Each additional pulley reduces the effort needed by half (but doubles the rope length pulled).

Diorama use: Lifting a heavier figure or platform smoothly with a small motor. The compound pulley lets a weak motor lift more weight.

Educational value: Teaches mechanical advantage, trade-offs between force and distance, and real-world applications (cranes, elevators).

---

**RATCHET AND PAWL (One-Direction Motion)**
A toothed wheel (ratchet) with a small pivoting latch (pawl) that allows rotation in only one direction. Click-click-click in one direction, locks in the other.

Diorama use: A turntable that only rotates forward — figures cycle through a display without ever going backwards. Also prevents a spring-loaded mechanism from unwinding prematurely.

Educational value: Teaches one-way mechanical constraints, used in winches, wrenches, and zip ties.

---

**ESCAPEMENT (Clock-Like Ticking Motion)**
The mechanism inside a mechanical clock that releases energy one tick at a time. A pendulum or balance wheel controls the rate.

Diorama use: A figure that "ticks" left-right at a steady pace — a sentinel scanning, or a guard figure turning its head rhythmically. Very mesmerizing, very mechanical.

Educational value: Teaches energy regulation, timing, and the history of clockmaking.

---

#### Mechanical Motion — Educational Kit Progression

These mechanisms build naturally into the STEM curriculum as hands-on modules:

| Lesson | Mechanism | Concept Taught | Diorama Application |
|--------|-----------|---------------|---------------------|
| Beginner | Lever (1st class) | Simple machines, fulcrum | Seesaw fight scene |
| Beginner | Simple pulley | Direction of force | Hoist a figure up |
| Beginner | Tension spring | Stored energy | Pull-back lunge |
| Intermediate | Rack and pinion | Rotation → linear motion | Figure slides across scene |
| Intermediate | Crank-slider | Reciprocating motion | Punching action |
| Intermediate | Syringe hydraulics | Pascal's law, fluid power | Arm/platform movement |
| Advanced | Geneva mechanism | Intermittent motion | Stop-and-go turntable |
| Advanced | Worm gear | Speed reduction, locking | Ultra-slow dramatic rotation |
| Advanced | Four-bar linkage | Complex path tracing | Walking figure |
| Advanced | Compound pulley | Mechanical advantage | Lift heavy figures with small motor |



### How It All Connects

1. The metal frame is wired to a low-voltage power source
2. Each figure has a small LED with magnetized contact points
3. When a figure is placed on the frame, the magnet snaps it into position **and** closes the electrical circuit
4. The LED illuminates — no separate switches needed
5. Figures can be freely repositioned; the light activates wherever they connect

### Deep Dive: The Magnetic LED Contact System (Lite-Brite Principle)

This is the core innovation of the entire project. If this works reliably, everything else follows. Here's how it actually works electrically, and what's needed to prototype it.

#### The Problem to Solve

An LED needs TWO conductors to light up — positive (+) and negative (−). A single metal plate is only ONE conductor. So the challenge is: how do you create two electrically isolated contact points on the diorama surface so that when a magnetic LED unit snaps onto it, both connections are made simultaneously?

#### The Solution: Dual-Contact System

Think of it like a coaxial power plug (the round barrel connector on a laptop charger). There's a center pin (positive) and an outer ring (negative), separated by insulation. The magnetic LED unit works the same way, just flat.

**The Diorama Surface (the "board"):**
The metal plate serves as one conductor — let's call it NEGATIVE (ground). On top of the plate, at each mounting point, a small copper disc or pad is attached with a thin insulating layer underneath (electrical tape or adhesive-backed Kapton tape). This copper disc is wired to POSITIVE. So at each point on the board you have two conductors: the steel plate (negative) and the copper pad (positive), separated by insulation.

**The LED Unit (the "peg"):**
Each LED unit has two contacts on its bottom face:
- A **neodymium ring magnet** (outer) — makes contact with the exposed steel plate around the copper pad. This is the NEGATIVE connection. The magnet also physically holds the unit to the board.
- A **center contact pin or copper pad** (inner) — makes contact with the copper disc on the board. This is the POSITIVE connection.
- The LED and a small current-limiting resistor are wired between these two contacts inside the unit.

**When you place the LED unit on the board:**
1. The ring magnet snaps to the steel plate → NEGATIVE connection made
2. The center pin lands on the copper pad → POSITIVE connection made
3. Circuit is complete → LED lights up
4. Pull the unit off → circuit breaks → LED turns off

#### Alternative Approach: Parallel Strip Method

Instead of individual copper pads at fixed points (which limits where you can place figures), use parallel conductive strips across the entire plate:

- The steel plate is the NEGATIVE conductor (entire surface)
- Strips of copper tape are laid across the plate in parallel lines, each on top of a thin insulating layer
- All copper strips connect to a POSITIVE bus wire along one edge
- The LED unit has two contacts spaced to match the strip width:
  - One contact lands on exposed steel between strips (negative)
  - The other contact lands on a copper strip (positive)
- The figure can be placed anywhere along the strips — not limited to fixed points

This is closer to how the original Lite-Brite worked, where any peg position completes a circuit.

#### Circuit Diagram (Text Description)

```
5V Power Supply (+) ──── copper pad/strip on board
                                    │
                              center contact
                                    │
                              ┌─────┴─────┐
                              │  Resistor  │
                              │  (150Ω)    │
                              └─────┬─────┘
                                    │
                              ┌─────┴─────┐
                              │    LED     │
                              │  (anode +) │
                              │(cathode −) │
                              └─────┬─────┘
                                    │
                              ring magnet
                                    │
5V Power Supply (−) ──── steel plate (ground)
```

#### Key Design Decisions

**Why a ring magnet?**
A ring (donut) magnet leaves a hole in the center for the positive contact pin to pass through. The magnet body touches the steel plate for the negative connection, and the center pin passes through the hole to touch the copper pad. Clean separation, no chance of shorting.

**Why neodymium?**
Neodymium magnets are conductive (they're a metal alloy). This matters because the magnet itself IS the electrical contact — no extra wiring needed for the negative connection. They're also extremely strong for their size, so a 6mm disc holds a figure securely.

**Why a current-limiting resistor?**
LEDs burn out instantly without one. At 5V with a standard LED (2V forward voltage), a 150Ω resistor limits current to ~20mA — safe operating range. The resistor goes inside the LED unit, between the positive contact and the LED anode.

**Polarity protection:**
If someone places the unit backwards (center pin on steel, magnet on copper), the LED simply won't light — it won't be damaged because LEDs only conduct in one direction. No harm done.

#### Prototype Bill of Materials

**For the board (diorama test surface):**

| Item | Spec | Qty | Est. Cost | Source |
|------|------|-----|-----------|--------|
| Steel sheet (mild steel) | 6" × 6" × 22 gauge | 1 | ~$5 | Home Depot / hardware store |
| Copper tape (adhesive-backed) | 6mm wide, conductive adhesive | 1 roll | ~$7 | Amazon |
| Kapton tape (insulating layer) | 10mm wide, heat-resistant | 1 roll | ~$6 | Amazon |
| Hook-up wire (22 AWG) | Red and black, stranded | 1 spool | ~$6 | Amazon |
| 5V USB power supply | 5V 2A, USB-A or USB-C | 1 | ~$8 | Amazon |
| USB breakout board | Exposes 5V and GND wires | 1 | ~$3 | Amazon |

**For the LED units (make 4–6 for testing):**

| Item | Spec | Qty | Est. Cost | Source |
|------|------|-----|-----------|--------|
| Neodymium ring magnets | 10mm OD × 5mm ID × 3mm thick | 6 | ~$8 | Amazon / K&J Magnetics |
| Pre-wired LEDs (5mm, assorted colors) | 5V pre-wired with resistor built in | 10 | ~$6 | Amazon |
| Small brass nails or copper rivets | 2–3mm diameter (center contact pin) | 10 | ~$3 | Hardware store |
| Epoxy putty or hot glue | For assembling LED units | 1 | ~$5 | Hardware store |
| Heat-shrink tubing | Assorted small sizes | 1 pack | ~$5 | Amazon |

**Tools needed:**

| Tool | Notes |
|------|-------|
| Soldering iron + solder | Basic 30–40W iron is fine |
| Wire strippers | For 22 AWG wire |
| Multimeter | Essential — test continuity and voltage at every step |
| Hot glue gun | For assembling LED units |
| Scissors / utility knife | For cutting tape and wire |
| Sandpaper (fine grit) | For cleaning steel surface to ensure good contact |

**Total estimated prototype cost: ~$55–65**

#### Step-by-Step Prototype Build

**Step 1: Prepare the board**
Sand the steel plate lightly to remove any coating or oxidation. Clean with rubbing alcohol. This ensures good electrical contact with the magnets.

**Step 2: Lay out the contact points**
Option A (fixed points): Place a small square of Kapton tape at each desired mounting point. Stick a copper tape pad on top of each Kapton square. Run a positive bus wire connecting all copper pads together.

Option B (strip method): Run parallel strips of Kapton tape across the plate, then copper tape on top of the Kapton. Space strips ~8mm apart (matching the ring magnet outer diameter). Connect all copper strips to a positive bus wire.

**Step 3: Wire the board**
Connect the steel plate to the NEGATIVE terminal of the 5V supply (solder or bolt a wire to the plate edge). Connect the copper pad bus wire to the POSITIVE terminal.

**Step 4: Build an LED unit**
Take a ring magnet. Thread a small brass nail or copper rivet through the center hole — this is the positive contact pin. Glue it in place with epoxy, ensuring the pin protrudes ~1mm below the magnet face (it needs to touch the copper pad). Solder the LED's positive wire to the pin. Solder the LED's negative wire to the magnet body (or to a small wire touching the magnet). Encase the wiring in hot glue or heat-shrink tubing for protection.

**Step 5: Test**
Power on the 5V supply. Place the LED unit on the board with the pin aligned over a copper pad. The magnet snaps to the steel, the pin contacts the copper, the LED lights up. Pull it off — LED goes dark. Move it to another pad — lights up again.

**Step 6: Iterate**
If contact is unreliable, try a stronger magnet, a larger copper pad, or a spring-loaded center pin (like a pogo pin). If the LED is dim, check voltage drop across the magnet (neodymium has some resistance — may need thicker contact area).

#### Potential Issues & Solutions

**Contact resistance through the magnet:** Neodymium magnets have higher electrical resistance than copper wire. For a single LED this is fine, but if the LED seems dim, solder a short copper wire from the magnet face to the LED's ground wire instead of relying on the magnet body alone.

**Copper tape adhesive may not be conductive:** Some copper tapes have non-conductive adhesive. Buy copper tape specifically labeled "conductive adhesive" for this project, or solder wire connections directly to the tape.

**Steel plate rusting over time:** Mild steel will rust. Options: use stainless steel (more expensive but permanent), galvanized steel (zinc coating, conductive), or clear-coat the plate with a thin conductive coating. Avoid thick paint — it insulates.

**Magnet strength vs. figure weight:** A 10mm neodymium disc holds ~2–3 lbs against steel. A 6-inch Marvel Legends figure weighs ~4–6 oz. Plenty of margin. For wall mounting (vertical surface), the magnet needs to hold against gravity — still fine for a single figure.

**Short circuit risk:** If the center pin touches the steel plate directly (misalignment), it shorts positive to negative. Mitigation: use a slightly recessed pin that only makes contact with the raised copper pad, or add a small fuse (resettable polyfuse) on the positive bus wire.

---

## 5. Audio System

Two distinct audio modes, both driven by the Raspberry Pi.

### Mode 1: Background Ambient Music

Passive background audio that sets the mood — no light synchronization, just sound.

**Music sources (easiest to hardest):**
- **USB stick or SD card with MP3s** (easiest) — the Pi reads local files and plays them in a loop using `mpv` or `vlc` via command line. No internet required. Most reliable option.
- **Spotify Connect** — install `raspotify` on the Pi and it appears as a Spotify speaker on your phone. Requires Spotify Premium and Wi-Fi.
- **Bluetooth receiver** — add a USB Bluetooth adapter and the Pi becomes a Bluetooth speaker. Stream from any phone app. Simple and source-agnostic.
- **YouTube / web streaming** — possible but clunky on a Pi Zero. Not recommended as primary method.

**Playlist ideas by theme:**
- Space diorama — ambient synth, Hans Zimmer Interstellar soundtrack style
- Street diorama — lo-fi hip hop, city rain ambience, jazz
- Underwater diorama — ocean sounds, whale calls, gentle piano
- Action/show mode — Marvel movie soundtrack highlights

**Speaker hardware:**
A small full-range speaker (2"–3") mounted inside or behind the diorama frame. Powered by a PAM8403 or MAX98357A mini amplifier board (~$3–5). The MAX98357A is an I2S DAC + amp in one — connects directly to the Pi's GPIO, no USB audio adapter needed. For better bass, a passive radiator paired with the speaker helps. Keep volume modest for office use.

### Mode 2: Synchronized Light Show (Music-Reactive)

LEDs flash, pulse, and change color in rhythm with the music — like a Christmas house light show but on a bookshelf.

**How it works:** Software analyzes the audio track and maps beats, frequencies, and volume levels to specific lighting channels. Each channel controls a group of lights. The sequence is pre-programmed or generated in real time. The Pi plays the audio and drives the lights simultaneously so they stay perfectly in sync.

**Software options:**
- **LightShowPi** — open-source, built specifically for Raspberry Pi. Analyzes audio in real time and triggers GPIO pins on the beat. Free and well-documented.
- **Falcon Player (FPP)** — professional-grade light show software used by serious Christmas display builders. Supports sequenced shows with frame-by-frame control. Can drive hundreds of channels.
- **Custom Python script** — use `aubio` or `librosa` for beat detection, map beats to GPIO pins via MOSFETs. More work but fully customizable.

**Channel mapping example:**
- Channel 1 — Backdrop LCD or LED matrix (color wash shifts)
- Channel 2 — Hero figure LEDs (flash on beat)
- Channel 3 — Villain figure LEDs (flash on off-beat)
- Channel 4 — Edge/accent LED strips (pulse with bass)
- Channel 5 — Servo motion (triggered on crescendo or chorus)

**Pre-sequenced vs real-time:**
- **Real-time** (LightShowPi) — plug in any song and it reacts automatically. Less precise but works with any track.
- **Pre-sequenced** (Falcon Player) — map out every light change frame by frame to a specific song. Much more polished but requires manual setup per track. This is what the serious Christmas display people use.

---

## 6. Backdrop Display

Three options for a digital backdrop behind the diorama.

### Option A: Small HDMI LCD Screen (Recommended for Realism)

A 5–7 inch IPS LCD screen connected to the Pi via HDMI. Full-color, high-resolution backdrop — animated starfields, city skylines, scrolling clouds.

**Recommended models:**
- **7" IPS 1024×600 (non-touch)** — sweet spot for size and price (~$25–40). Brands: HMTECH, HAMTYSAN, SunFounder
- **5" IPS 800×480** — for smaller dioramas. ELECROW makes a solid one (~$25)
- **Budget option:** 7" displays on AliExpress for as low as ~$11

Why it works: Pi drives it natively over HDMI. Can switch backdrops per theme with different video files. Sits flat behind the frame, flush with the back wall. Get IPS panel (not TN) for proper viewing angles.

### Option B: RGB LED Matrix Panel (Best for Ambient Glow)

A HUB75 RGB LED matrix panel driven by the Pi. Lower resolution but vibrant, retro, comic-book aesthetic.

**Recommended panels:**
- **Waveshare 64×32 RGB, 4mm pitch** — 256×128mm, full color, chainable (~$15–25)
- **Adafruit/SparkFun 32×32 RGB, 4–6mm pitch** — 7.5" square (~$25–35)

Driven by the Pi using the `rpi-rgb-led-matrix` library. Needs an Adafruit RGB Matrix Bonnet or HAT (~$15). Great for abstract effects, color washes, and pixel art scenes. Needs its own 5V/4A power supply per panel.

### Option C: Combination (Best of Both Worlds)

Use the LCD screen as the main backdrop for detailed scenes, and add a strip of RGB LED matrix along the top or bottom edge for accent lighting and ambient effects. The Pi can drive both simultaneously.

---

## 7. Controller

### Arduino Nano / Uno
Best for simple, dedicated tasks — run a few servos and LEDs on a loop. Very low power draw, instant boot, no OS to crash. Limited to pre-programmed patterns; changes require re-uploading code. Cost: ~$5–15.

### Raspberry Pi (Recommended)
Full Linux computer the size of a credit card. Can handle lighting, motion, AND sound effects all from one board.

Why it's the better choice:
- Run a Python script that coordinates servos, LEDs, and audio simultaneously
- Add a speaker for ambient sound effects (city noise, cosmic hum)
- Control via your phone over Wi-Fi — change scenes, adjust speed, trigger effects
- Schedule modes (slow ambient during work hours, full action when recording YouTube)
- HDMI output drives the backdrop screen
- Easy to update — SSH in and tweak the script from your laptop
- Needs a HAT or breakout board (like the Adafruit PCA9685) to drive multiple servos
- Cost: ~$35–75 depending on model

### Recommended Hardware Setup
- **Raspberry Pi Zero 2W** — small, cheap, Wi-Fi built in, plenty of power for this
- **PCA9685 servo driver board** — controls up to 16 servos from a single Pi
- **MOSFET breakout boards** — for switching LED strips and individual LEDs
- **MAX98357A I2S DAC + amp** — for sound effect output to a small speaker
- **5V 10A power supply** — one supply powering the Pi, servos, and LEDs through a distribution board

---

## 8. Use Cases & Display Modes

### Office Bookshelf Display
Very slow, ambient motion — figures drift slowly, almost meditation-like. Soft LED glow at low brightness. Quiet or no sound effects. Could run on a timer — active during work hours, off at night. Conversation starter without being overwhelming.

### YouTube Video Backdrop
Slightly more dynamic motion — enough to catch the eye on camera without being distracting. Brighter LED lighting tuned to camera white balance. Position the diorama behind and to the side, slightly out of focus. The Pi triggers a "filming mode" preset via phone — bumps brightness and motion speed. Sound effects OFF during filming (mic would pick them up). Multiple themed dioramas on the same bookshelf give visual variety between videos.

### Full Action Demo / Show Mode
Maximum motion speed and LED brightness. Sound effects active — punches, repulsor blasts, web-shooting sounds, ambient audio. For recording dedicated diorama showcase videos or live streams. Triggered by a single button press or phone command.

### Interactive / Sensor Mode (Future Upgrade)
Motion sensor activates the display when someone walks by. Returns to sleep mode after a timeout. Great for an office where you want it to "wake up" for visitors.

---

## 9. Business Model — Legendary Arena Marketplace

### The Vision

A one-stop shop at **legendary-arena.com** where customers purchase everything needed to build a Marvel action figure diorama. The core product is a **starter kit priced around $100** designed as a weekend project that a parent and child can assemble together on a Saturday afternoon.

### Revenue Streams

**1. Action Figures**
Hasbro Marvel Legends series — 6-inch scale, highly detailed, wide character selection. Interchangeable parts built into the product line. Buy at wholesale and resell, or use an affiliate/dropship model to avoid holding inventory. Bundle themed figure packs (e.g., "Street Heroes Pack" with Spider-Man + Daredevil, "Cosmic Pack" with Silver Surfer + Galactus).

**2. Magnetic Rigging Accessories**
Magnetic boots, belts, gloves, and back plates custom-designed for Marvel Legends scale. 3D printed in-house to keep costs low and margins high. Sold individually or as a rigging accessory kit. This is a unique product — nobody else is selling magnetic diorama rigging for action figures. Strong differentiator. Clear clips, armature wire bundles, and monofilament as add-ons.

**3. Electronics Starter Kit**
Pre-packaged kit containing: Raspberry Pi (Zero 2W, bought at wholesale), PCA9685 servo driver board, pre-wired LED pack (assorted colors, pre-soldered leads), small speaker + MAX98357A amp board, on/off switch, 5V power supply, pre-loaded SD card with diorama control software and sample playlists/light shows, and a simple wiring harness with labeled connectors. The SD card is key — customer powers it on and it just works out of the box.

**4. Backdrop Display Kit**
7" IPS LCD screen + printed vinyl backgrounds, or RGB LED matrix panel + bonnet board. Pre-loaded video loops on the SD card (starfield, city street, underwater).

**5. Diorama Frame**
The metal frame itself as a flat-pack kit (bolts together like IKEA). Sized for a standard bookshelf (~12"–16" wide). Steel or aluminum sheet for the floor and back wall. Pre-drilled holes for servo mounts, wire routing, and speaker placement.

**6. Scene Accessories (Future Expansion)**
Miniature props: trash cans, dumpsters, fire hydrants, streetlights (street scene); asteroids, planet models (space); coral, treasure chests, seaweed (underwater). Inventory concern is valid — mitigate by starting with 5–10 best-sellers per theme, using 3D printing for on-demand production, partnering with miniature/model train suppliers for dropshipping, and offering digital STL files for customers with their own 3D printers (pure profit, zero inventory).

### Product Tiers

**Starter Kit (~$100):** 1 metal frame (flat-pack), 1 rigging accessory pack (boots, belt, clips), basic LED pack (6–8 pre-wired LEDs), armature wire bundle + monofilament, printed step-by-step assembly guide. Figures and electronics sold separately.

**Complete Kit (~$175–200):** Everything in the Starter Kit PLUS Raspberry Pi Zero 2W with pre-loaded SD card, speaker + amp board, 7" LCD backdrop screen, 5V power supply and on/off switch, wiring harness. Figures still sold separately (licensing considerations).

**Premium / Light Show Kit (~$250–300):** Everything in the Complete Kit PLUS 2 micro servos for animated figures, RGB LED matrix accent panel, pre-sequenced light show files, upgraded speaker, motion sensor for interactive mode.

### The Saturday Project — Marketing Angle

This is the emotional core of the brand. The pitch isn't "buy a diorama" — it's **"spend a Saturday with your kid building something awesome."**

Target audience: dads, granddads, uncles — anyone who wants quality time with a young Marvel fan. The assembly process IS the product, not just the finished display. Include a printed, illustrated assembly guide — make it feel like a real project. Difficulty level: IKEA meets science fair. No soldering required in the starter kit (pre-wired connectors). Estimated build time: 2–3 hours for the starter kit. The finished diorama sits on the kid's bookshelf as something they built with their hands. YouTube channel opportunity: film the build process, review new figure releases, showcase customer builds.

### Inventory Management Strategy

- **3D print in-house:** magnetic rigging accessories, scene props, frame brackets — made to order
- **Wholesale bulk buy:** Raspberry Pi boards, LED components, wire, speakers — small, stackable, long shelf life
- **Dropship or affiliate:** Hasbro figures — avoid holding toy inventory (large, seasonal, returns-heavy)
- **Digital products:** STL files for 3D printing, light show sequence files, backdrop video loops — zero inventory, pure margin
- **Start lean:** Launch with one theme (Street Scene) and one kit tier (Starter). Expand based on demand

---

## 10. STEM Education Platform

### The Modern Heathkit

In the 1960s–70s, **Heathkits** let teenagers buy kits and build real electronics — radios, amplifiers, oscilloscopes — with step-by-step manuals that taught them how everything worked. There is no modern equivalent that combines hands-on building with real engineering education in a way that's also genuinely fun. This diorama kit fills that gap.

The idea: sell the diorama kit as a STEM learning platform where students learn mechanical engineering, electrical engineering, and programming by building something they actually want to display when they're done.

### Educational Tracks

**Track 1: Mechanical Engineering**
Assembling the metal frame (basic fabrication, fasteners, structural concepts). Bending and shaping armature wire (material properties, stress, flexibility). Rigging figures with magnetic mounts (magnetic force, polarity, friction). Balancing weight and leverage for suspended figures (center of gravity, torque). Designing custom 3D-printed parts (CAD basics, tolerances, iteration).

**Track 2: Electrical Engineering**
Wiring LEDs in series vs parallel (Ohm's law, voltage drop, current limiting). Understanding magnetic contacts as switches (open/closed circuits). Powering multiple devices from one supply (power distribution, amperage budgeting). Using MOSFETs to switch LED channels (transistor basics, digital logic). Servo motor control (PWM signals, duty cycle, frequency). Soldering practice (for advanced kits).

**Track 3: Programming**

*Option A — Python (Recommended for Beginners):*
The Pi's native language — massive community, beginner-friendly syntax. Libraries: `RPi.GPIO` for LED/servo control, `pygame` for audio, `aubio` for beat detection. Curriculum progression: blink an LED → control brightness with PWM → move a servo → play a sound file → LED reacts to music beat → build a full scene controller → add Wi-Fi control from a phone.

*Option B — JavaScript / Node.js (Preferred):*
Familiar to web developers, runs on Pi via Node.js. Libraries: `onoff` for GPIO, `pigpio` for PWM/servo, `play-sound` for audio. Advantage: students learning JavaScript get skills that transfer directly to web development. Could tie into the Legendary Arena web platform — same language on the diorama and the website. Slightly steeper hardware library ecosystem than Python, but fully capable.

*Option C — Both (Advanced Track):*
Start with Python for hardware fundamentals (more tutorials available). Transition to Node.js for the web control interface. Final project: a Node.js web dashboard that controls the diorama remotely — bridges hardware and web development.

### Curriculum / Manual Design

Each kit includes a **printed, illustrated training manual** structured as a series of guided exercises.

Lesson format: Concept → Diagram → Build It → Test It → What Just Happened? Each lesson builds on the previous one. Sidebars explain the science ("Why does the LED need a resistor?" / "What is PWM?"). Challenge exercises at the end of each chapter for advanced students. QR codes link to video walkthroughs on the Legendary Arena YouTube channel. Answer key and troubleshooting guide in the back.

**Sample Lesson Progression (12 Lessons):**
1. Meet Your Raspberry Pi — setup, boot, terminal basics
2. Hello LED — wire and light your first LED via code
3. Colors and Brightness — PWM dimming, RGB LEDs
4. Meet the Servo — move a motor to exact positions
5. Magnetic Switches — build a magnetic contact circuit
6. Your First Figure — mount, rig, and light one action figure
7. Sound Check — play audio files through the speaker
8. Scene Builder — control multiple LEDs and servos together
9. The Light Show — sync lights to music beats
10. Phone Control — build a simple web interface to control the diorama over Wi-Fi
11. Sensor Mode — add a motion sensor to trigger the display
12. Final Project — program a complete automated scene with light, sound, and motion

### Science Fair Project

The diorama kit is a natural science fair project at multiple grade levels:

- **Elementary:** "How do magnets work?" — demonstrate magnetic mounting, polarity, and attraction/repulsion
- **Middle School:** "How do circuits work?" — demonstrate LED circuits, switches, and power distribution using the diorama as a visual circuit board
- **High School:** "Building an Automated System" — demonstrate programming, sensor input, and coordinated output (lights + sound + motion)

The finished diorama IS the display board — it's a working, interactive exhibit, not just a poster.

### Disney Audio-Animatronics Inspiration

Walt Disney's **Audio-Animatronics** debuted with the "Great Moments with Mr. Lincoln" exhibit at the 1964 World's Fair and later Disneyland. A pre-recorded audio track drove synchronized mechanical movements — Lincoln appeared to speak, gesture, and move realistically. The original used pneumatic actuators and cam-based timing systems.

**Scaled-down diorama version:** Pre-record or use text-to-speech to generate character dialogue. Map the audio waveform to servo positions — when a loud syllable plays, the servo tilts the figure's head or moves an arm. A jaw servo on a custom figure head could simulate mouth movement synced to audio amplitude. Multiple figures could have a scripted "conversation." The Pi handles the timing: play audio → trigger servo sequence → fire LED effects at key moments.

**Example scene — Street Diorama:** Spider-Man perched on a wall, head servo scanning left to right. Daredevil on the ground, arm servo raising a billy club. Pre-recorded dialogue plays: "I've got the rooftops." / "I'll take the alley." LEDs flash on cue — streetlight flickers, eyes glow. Total runtime: 15–30 second scripted loop.

**Advanced Animatronics Kit (Premium Add-On):** Micro servos sized for 6-inch figure heads and arms. Custom 3D-printed figure heads with jaw articulation. Pre-built audio-to-motion mapping software on the SD card. Script editor where students write dialogue and map it to figure movements. This becomes the capstone project in the curriculum — everything learned comes together.

---

## 11. Gaps & Additional Considerations

### Universal Power Compatibility

The US runs on 120V/60Hz. Europe, Asia, Africa, and most of the world run on 220–240V/50Hz, with different plug shapes by country. To make the kit sellable internationally without stocking different versions:

**Solution: Use a 5V USB-C power input.**
Most modern devices have already solved this problem. A 5V USB-C power supply with a universal input rating (100–240V, 50/60Hz) works in any country — the customer just needs the right wall plug adapter for their outlet shape. These universal adapters cost ~$1–2 and are widely available.

**How to implement:**
- Ship the kit with a 5V USB-C cable and a US plug adapter (for domestic orders)
- Include a note: "Works worldwide — use any USB-C phone charger or add a travel plug adapter for your country"
- Optionally sell a plug adapter pack (US/EU/UK/AU) as an add-on for ~$5
- The Raspberry Pi Zero 2W already uses micro-USB or USB-C for power — this aligns naturally
- All LEDs, servos, and components run on 5V DC, so there's no voltage conversion needed inside the kit
- A single 5V/10A USB-C power supply with a distribution board powers everything

**Result:** One SKU ships worldwide. No regional variants. No regulatory headaches with different mains voltages.

### Safety & Age Ratings

If marketing to children and selling through retail (even online), safety certifications matter:
- **Small magnets warning** — neodymium magnets are a serious swallowing hazard for young children. Packaging must include appropriate warnings. Consider age rating 12+ for kits with loose magnets.
- **Electrical safety** — low voltage (5V) is inherently safe, but the kit should still include basic safety instructions (don't short-circuit, keep away from water unless it's the aquarium kit with proper precautions)
- **CE marking (Europe)** and **FCC compliance (US)** may be required if selling electronic kits — research what thresholds apply for hobbyist/educational kits vs. consumer electronics
- **CPSIA (US)** — if marketed to children under 13, additional testing and labeling requirements apply. Marketing to "families" with a 12+ age rating may simplify compliance.

### Intellectual Property — Protecting Your Own Designs

While the Hasbro licensing question is about *their* IP, you should also protect *yours*:
- **The magnetic rigging system** — if this is truly novel (and it appears to be), consider filing a provisional patent ($150–200, buys 12 months of protection while you validate the market)
- **The Legendary Arena brand** — trademark the name and logo
- **The curriculum / manual content** — automatically copyrighted, but register for stronger protection if it becomes a revenue driver
- **3D print STL files** — include a license that allows personal use but not resale

### Spare Parts & Replacement Components

Customers will lose magnets, break wires, and burn out LEDs. Plan for it:
- Sell individual replacement packs (magnet set, LED pack, wire bundle, armature wire)
- Include 1–2 spare LEDs and an extra magnet in every kit — reduces support tickets and builds goodwill
- A "parts" section on legendary-arena.com where customers can order exactly what they need

### Packaging & Unboxing Experience

The unboxing IS part of the Saturday Project experience:
- A well-designed box with compartments (not just parts loose in a bag) signals quality
- Printed assembly guide sits on top when you open the box — first thing you see
- Parts organized in labeled bags by lesson number ("Lesson 2: Hello LED — open this bag")
- Include a small card: the origin story (Tex, the game, the friendship) — makes the brand human

### Accessibility

Consider how the kit works for people with different abilities:
- Large, clearly labeled connectors (not tiny pins requiring tweezers)
- Color-coded wires (not just by wire color, but with printed labels for color-blind users)
- The printed manual should use large enough fonts and clear diagrams
- Video walkthroughs on YouTube serve as an alternative to the printed guide

### Warranty & Support

- A simple 90-day warranty on electronic components (Pi, servo driver, amp board)
- A troubleshooting FAQ page on legendary-arena.com
- A community forum or Discord where builders help each other — reduces your support burden and builds loyalty
- Consider a QR code on the assembly guide that links directly to a support/FAQ page

---

## 12. Future Ideas

- **Franchise expansion:** Star Wars, DC Comics, Pixar, anime, or historical figures (Civil War diorama, space exploration)
- **Community gallery:** Customers upload photos/videos of their builds to legendary-arena.com — showcase page, monthly featured build, voting/contests
- **Subscription model:** Monthly "scene drop" — a new accessory pack, backdrop video, and light show sequence file mailed or emailed each month
- **App control:** A dedicated Legendary Arena mobile app that connects to the Pi over Wi-Fi — scene selector, speed sliders, color picker, light show trigger
- **Augmented reality (AR):** Point your phone at the diorama and see additional digital effects overlaid — explosions, energy beams, flying debris
- **Collaboration kits:** Two dioramas designed to sit side by side and form one larger connected scene (e.g., the street extends into a rooftop)
- **Custom figure painting service:** Offer hand-painted or custom-modified figures for customers who want a premium display
- **Convention/trade show booth:** A large-scale demo diorama at comic cons — draws traffic, generates orders, builds brand awareness
- **Affiliate/influencer program:** Send kits to Marvel/toy YouTubers and collectors for review and unboxing content
- **Classroom bulk pricing:** Discounted kits for schools and STEM programs ordering 10+ units
- **Online course:** Video-based curriculum hosted on legendary-arena.com — complements the printed manual, could be sold separately or bundled
- **Diorama design software:** A web-based tool where customers plan their scene layout, choose figures, and see a preview before ordering parts
- **Seasonal/holiday themes:** Halloween horror diorama (Venom, Carnage), Christmas display mode with light show integration
- **Sound effect marketplace:** Community-created sound packs and light show sequences that customers can download and load onto their Pi

---

## 13. Work Tasks & Priorities

Tasks are weighted by **impact** (how much they move the project forward) and **urgency** (how time-sensitive they are). Weight scale: Critical (do first) → High → Medium → Low (can wait).

### Critical — Foundation (Do First)

| # | Task | Why It's Critical |
|---|------|-------------------|
| 1 | **Build one working prototype (Street Scene)** | Nothing else matters until a physical diorama exists. Proves the concept, generates photos/video for marketing, reveals problems you can't find on paper. |
| 2 | **Validate the magnetic LED contact system** | This is the core innovation. If magnets-as-electrical-contacts doesn't work reliably, the entire product concept changes. Test with neodymium magnets, steel sheet, and a simple LED circuit. |
| 3 | **Source and price key components** | Get real wholesale pricing on Raspberry Pi Zero 2W, LEDs, servos, magnets, and steel sheet. Can't set kit pricing without real costs. |
| 4 | **Define the Starter Kit bill of materials (BOM)** | Exact parts list, exact quantities, exact cost per kit. This determines the $100 price point viability. |

### High — Product & Revenue (Do Next)

| # | Task | Why It's Important |
|---|------|-------------------|
| 5 | **Design and 3D print magnetic rigging accessories** | Your strongest differentiator. Needs a 3D printer (or access to one) and Marvel Legends figures to fit-test. |
| 6 | **Write the Raspberry Pi control software** | The pre-loaded SD card experience. Python or Node.js script that boots and runs the diorama out of the box. |
| 7 | **Design the flat-pack metal frame** | Needs to be simple enough to assemble without tools beyond a screwdriver, sized for a bookshelf, and affordable to manufacture. |
| 8 | **Set up legendary-arena.com marketplace** | Product pages, cart, checkout. Could start with Shopify or WooCommerce. |
| 9 | **Film the first build video** | Document the prototype build from unboxing to finished display. This becomes your flagship marketing content and proof of concept. |

### Medium — Growth & Education (Build Momentum)

| # | Task | Notes |
|---|------|-------|
| 10 | **Write the printed assembly guide (Lessons 1–6)** | Start with the first half of the curriculum. Enough to ship with the Starter Kit. |
| 11 | **Create 3–5 backdrop video loops** | Starfield, city street at night, underwater coral reef. Load onto the SD card. |
| 12 | **Build the synchronized light show demo** | Install LightShowPi, map one song to the diorama's LED channels. This is the viral demo. |
| 13 | **Develop the YouTube channel** | Build tutorials, unboxings, customer showcases, and science fair walk-throughs. |
| 14 | **Research Hasbro licensing / reseller requirements** | Determine if you can resell figures or if affiliate/dropship is the safer path. |

### Low — Future Expansion (Can Wait)

| # | Task | Notes |
|---|------|-------|
| 15 | **Underwater / aquarium diorama prototype** | Exciting but complex. Build after the dry diorama is proven and selling. |
| 16 | **Animatronics add-on kit** | Jaw servos, custom figure heads, audio-to-motion software. Premium product for after the base is established. |
| 17 | **Mobile app for diorama control** | Nice-to-have. Phone browser + Pi web server works fine in the meantime. |
| 18 | **Scene accessory line (trash cans, trees, etc.)** | Start with STL digital files before investing in physical inventory. |
| 19 | **Classroom bulk program** | Pursue once you have testimonials and a refined kit. |
| 20 | **Convention booth / trade show presence** | Plan for year two after online sales prove demand. |

---

## 14. Open Questions

### Technical
- What voltage/power source is safest and simplest? (e.g., 5V USB, 12V adapter)
- What magnet size and strength balances secure hold with easy repositioning?
- How to insulate positive and negative contacts to prevent short circuits?
- What type of LED (SMD, pre-wired) fits best inside or behind the figures?
- Frame material — steel sheet, perforated metal, or custom welded frame?
- Should the magnetic accessories be 3D printed, hand-sculpted, or a mix of both?
- How to run thin wiring from the magnet contact point through the accessory to the LED without it being visible?
- Standard figure scale — 6-inch (Marvel Legends) or larger?
- Should motion be continuous or triggered (button, sensor, timer)?
- How to minimize motor noise in the display?
- Can LED wiring and armature wire share the same path cleanly at scale (10+ figures)?
- Power budget — how many LEDs and motors can run off a single supply?
- Which Raspberry Pi model balances cost, size, and capability best?
- Should each themed diorama have its own Pi, or one Pi controlling multiple scenes?

### Audio
- What sound library or effects source to use for ambient audio?
- LightShowPi (real-time, easy) vs Falcon Player (pre-sequenced, polished) — which fits the workflow better?
- How many lighting channels can the Pi drive simultaneously during a light show?
- Speaker size and placement — inside the frame, behind it, or separate?

### Aquarium
- Figures inside vs outside the tank, or both?
- What sealant/clear coat is both waterproof and aquarium-safe for figures?
- Nano tank size — 3 gallon (compact) or 5 gallon (more room for fish and figures)?
- Can one Pi control both dry dioramas and the aquarium diorama simultaneously?

### Business
- Hasbro licensing — can you resell Marvel Legends figures, or is an affiliate/dropship model safer?
- Does selling custom magnetic accessories for trademarked characters require licensing?
- 3D printer recommendation for in-house production of rigging accessories and props?
- Shipping logistics — flat-rate box sizing for the starter kit?
- Where to source Raspberry Pi at wholesale (approved resellers vs direct)?
- Should the first launch be a Kickstarter/pre-order to validate demand before buying inventory?
- YouTube channel strategy — build tutorials, unboxings, customer showcase reels?

### Education
- Python vs Node.js vs both — which track to develop first for the curriculum?
- Target age range for the manual — middle school (11–14) or broader?
- Should the manual be printed in-house or professionally printed?
- Partnership opportunities with schools, STEM programs, or homeschool co-ops?
- Could this qualify as a classroom curriculum supplement (aligns with NGSS or state standards)?
- Animatronics add-on: custom figure heads with jaw servos — 3D print or partner with a manufacturer?
