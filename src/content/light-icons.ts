interface SignalDrawing {
  paths: Record<string, string>
  text?: { value: string; x: number; y: number; size: number }[]
}

const brakeCircle = 'M16 13a24 24 0 0 0 0 38M48 13a24 24 0 0 1 0 38M50 32a18 18 0 1 1-36 0 18 18 0 0 1 36 0'
const exclamation = 'M32 21v13m0 8v1'
const car = 'M22 14h20l5 13v18H17V27l5-13Zm-5 13h30M22 45v5m20-5v5M23 35h2m14 0h2'
const skidCar = 'M23 7h18l5 12v16H18V19l5-12Zm-5 12h28M23 35v3m18-3v3M23 26h2m14 0h2'
const skidTracks = 'M23 41c-12 5 10 8-2 14M41 41c-12 5 10 8-2 14'
const lampLeft = 'M36 17v30c19 0 19-30 0-30Z'
const straightRays = 'M10 19h18M10 28h18M10 37h18M10 46h18'
const dippedRays = 'M10 26l18-7M10 35l18-7M10 44l18-7M10 53l18-7'
const fogWave = 'M21 11c-9 7 9 14 0 21s9 14 0 21'
const battery = 'M9 21h46v30H9ZM17 21v-6h8v6m14 0v-6h8v6'
const oilCan = 'M12 29h25l12-9 5 7-15 17H17l-5-15Zm5 0v-7h12v7M12 30H7v10h8M22 22v-5h8'
const drop = 'M54 35c0 0-5 7-5 10a5 5 0 0 0 10 0c0-3-5-10-5-10Z'

/** Original schematic telltales; named parts make direction/state differences reviewable. */
export const lightIcons = {
  brake: { paths: { brakeCircle, exclamation } },
  oil: { paths: { oilCan, drop } },
  temperature: { paths: {
    thermometer: 'M29 13a3 3 0 0 1 6 0v23a8 8 0 1 1-6 0V13Zm6 5h7m-7 7h5m-5 7h7',
    coolant: 'M7 51q6-6 12 0t12 0 12 0 12 0M7 59q6-6 12 0t12 0 12 0 12 0'
  } },
  transmission: { paths: {
    gear: 'M26 8h12l2 8 7-4 8 8-4 7 8 2v11l-8 2 4 7-8 8-7-4-2 7H26l-2-7-7 4-8-8 4-7-8-2V29l8-2-4-7 8-8 7 4 2-8Z',
    exclamation: 'M32 22v13m0 8v1'
  } },
  battery: { paths: { battery, polarity: 'M16 35h10m17-5v10m-5-5h10' } },
  airbag: { paths: {
    person: 'M21 14a5 5 0 1 1-10 0 5 5 0 0 1 10 0M16 25l6 15h15l6 15M9 27v20h19',
    airbag: 'M54 27a12 12 0 1 1-24 0 12 12 0 0 1 24 0'
  } },
  seatbelt: { paths: {
    person: 'M37 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0M23 24l-5 17 8 5-4 13m19-35 5 17-8 5 4 13M23 24h18',
    diagonalBelt: 'M43 21 23 45',
    lapBelt: 'M20 40l24 6'
  } },
  door: { paths: {
    car: 'M23 9h18l5 12v33H18V21l5-12Zm0 13h18v19H23Zm-5 25h28',
    openDoors: 'M18 27 5 20v18l13 4m28-15 13-7v18l-13 4'
  } },
  engine: { paths: {
    engine: 'M17 23h9v-7h14v7h7l6 8h5v17h-9l-6 6H20l-7-9V29h4v-6ZM7 29v17m-4-8h10M27 10h12m-6 0v6'
  } },
  abs: { paths: { brackets: 'M13 12a26 26 0 0 0 0 40M51 12a26 26 0 0 1 0 40' },
    text: [{ value: 'ABS', x: 32, y: 38, size: 18 }] },
  tpms: { paths: {
    tyre: 'M17 10C6 25 7 43 16 51h32c9-8 10-26-1-41M16 51v5m8-5v5m8-5v5m8-5v5m8-5v5',
    exclamation: 'M32 20v15m0 8v1'
  } },
  eps: { paths: {
    steering: 'M46 32a19 19 0 1 1-38 0 19 19 0 0 1 38 0ZM9 28h36M27 34v16M9 29l12 9h12l12-9',
    exclamation: 'M56 18v18m0 8v1'
  } },
  'esp-active': { paths: { car: skidCar, skidTracks } },
  'esp-off': { paths: { car: skidCar, skidTracks: 'M23 39c-8 3 4 5 0 7M41 39c-8 3 4 5 0 7' },
    text: [{ value: 'OFF', x: 32, y: 58, size: 12 }] },
  immobilizer: { paths: { car,
    key: 'M35 31a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm0 0h8m-3 0v4'
  } },
  dpf: { paths: {
    filter: 'M17 15h30v34H17ZM5 27h12m30 10h12',
    soot: 'M25 23v1m8-1v1m8-1v1m-16 8v1m8-1v1m8-1v1m-16 8v1m8-1v1m8-1v1'
  } },
  'glow-plug': { paths: {
    coil: 'M5 43h13c14 0 14-26 3-26S10 43 24 43h16c14 0 14-26 3-26S32 43 46 43h13'
  } },
  service: { paths: {
    wrench: 'M39 8a14 14 0 0 0-16 18L8 43a8 8 0 0 0 11 11l17-17A14 14 0 0 0 54 21l-10 9-10-10 5-12Z',
    handleHole: 'M17 46v1'
  } },
  'fuel-low': { paths: {
    pump: 'M10 55V12h26v43M7 55h33M15 17h16v15H15Z',
    hose: 'M36 34h5v13a6 6 0 0 0 12 0V26l-9-10m3 3v10h6'
  } },
  'washer-fluid': { paths: {
    windscreen: 'M9 30q23-12 46 0l-6 24H15L9 30Z',
    spray: 'M32 47V21m-5 17L16 18m21 20 11-20M9 15l-2-3m9-2-1-4m17 8v-4m16 0 1-4m6 9 2-3'
  } },
  'high-beam': { paths: { lamp: lampLeft, horizontalRays: straightRays } },
  'fog-light': { paths: { lamp: lampLeft, dippedRays, fogWave } },
  cruise: { paths: {
    speedometer: 'M11 48a25 25 0 1 1 42 0M12 32h6m4-17 3 5m17-5-3 5m13 12h-6M32 10v7',
    arrow: 'M27 42 40 28m-11 1h11v11'
  } },
  'lane-assist': { paths: { car: 'M27 23h10l4 9v15H23V32l4-9Zm-4 9h18',
    lanes: 'M18 8 7 56M46 8l11 48'
  } },
  'parking-brake': { paths: { brakeCircle }, text: [{ value: 'P', x: 32, y: 40, size: 24 }] },
  epb: { paths: { brackets: 'M11 12a26 26 0 0 0 0 40M53 12a26 26 0 0 1 0 40' },
    text: [{ value: 'EPB', x: 32, y: 38, size: 16 }] },
  'low-beam': { paths: { lamp: lampLeft, dippedRays } },
  'position-light': { paths: {
    lamps: 'M23 20v24c-13 0-13-24 0-24Zm18 0v24c13 0 13-24 0-24Z',
    rays: 'M5 18l5 4M3 32h6m-4 14 5-4m49-24-5 4m7 10h-6m4 14-5-4'
  } },
  'rear-fog': { paths: {
    lamp: 'M28 17v30c-19 0-19-30 0-30Z',
    horizontalRays: 'M36 19h18M36 28h18M36 37h18M36 46h18',
    fogWave: 'M43 11c-9 7 9 14 0 21s9 14 0 21'
  } },
  'turn-signal': { paths: {
    arrows: 'M5 32 18 19v8h10v10H18v8L5 32Zm54 0L46 19v8H36v10h10v8l13-13Z'
  } },
  hazard: { paths: {
    outerTriangle: 'M32 8 59 55H5L32 8Z',
    innerTriangle: 'M32 23 45 46H19l13-23Z'
  } },
  master: { paths: { triangle: 'M32 7 59 55H5L32 7Z', exclamation: 'M32 24v14m0 8v1' } },
  'oil-level': { paths: { oilCan, drop,
    level: 'M9 57q5-4 10 0t10 0 10 0 10 0 10 0'
  } },
  'water-in-fuel': { paths: {
    filter: 'M17 14h30v35H17ZM24 8v6m16-6v6M17 42h30M24 49v7m16-7v7',
    water: 'M32 22s-6 8-6 11a6 6 0 0 0 12 0c0-3-6-11-6-11Z'
  } },
  adblue: { paths: {
    tank: 'M11 29h24v25H11Zm6 0v-6h12v6',
    drop: 'M48 10s-8 10-8 15a8 8 0 0 0 16 0c0-5-8-15-8-15Z'
  }, text: [{ value: 'DEF', x: 23, y: 45, size: 10 }] },
  'auto-hold': { paths: {}, text: [
    { value: 'AUTO', x: 32, y: 28, size: 17 }, { value: 'HOLD', x: 32, y: 48, size: 17 }
  ] },
  'forward-safety': { paths: {
    car: 'M9 13h18l4 9v15H5V22l4-9Zm-4 9h26M10 37v5m16-5v5',
    impact: 'M39 16 35 25l8 3-8 7 8 8',
    obstacle: 'M53 11v38'
  } },
  ready: { paths: {}, text: [{ value: 'READY', x: 32, y: 38, size: 16 }] },
  'ev-battery-low': { paths: { battery, lowCharge: 'M16 44h7v-7h-7Z' } },
  'power-limited': { paths: {
    turtle: 'M15 36a17 17 0 0 1 34 0v8H15v-8Zm0 2-7-3v8l7-2m34-12h5a6 6 0 0 1 0 12h-5M21 44v8m20-8v8',
    shell: 'M23 22 32 30l9-8M32 30v14M15 36h34'
  } },
  'ev-system': { paths: { car, exclamation: 'M32 23v10m0 6v1' } },
  'charge-connector': { paths: {
    plug: 'M20 13v12m16-12v12M14 25h28v11a14 14 0 0 1-28 0V25ZM28 50v7h22V43'
  } },
  'regen-brake': { paths: { brakeCircle, exclamation } }
} satisfies Record<string, SignalDrawing>

export type DashboardIconName = keyof typeof lightIcons

export const isDashboardIconName = (value: unknown): value is DashboardIconName =>
  typeof value === 'string' && Object.hasOwn(lightIcons, value)

export const getLightDrawing = (name: DashboardIconName): SignalDrawing => lightIcons[name]
