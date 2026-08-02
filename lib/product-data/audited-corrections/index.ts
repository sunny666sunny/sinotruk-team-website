import heavyDump from './heavy-dump'
import heavyTractor from './heavy-tractor'
import heavyCargo from './heavy-cargo'
import lightCargo from './light-cargo'
import lightTipper from './light-tipper'
import specialWater from './special-water'
import specialOil from './special-oil'
import specialMixer from './special-mixer'
import specialOther from './special-other'
import lightPickup from './light-pickup'
import lightSuv from './light-suv'
import semiTrailer from './semi-trailer'
import newEnergy from './new-energy'

export const auditedProductCorrections = {
  ...heavyDump,
  ...heavyTractor,
  ...heavyCargo,
  ...lightCargo,
  ...lightTipper,
  ...specialWater,
  ...specialOil,
  ...specialMixer,
  ...specialOther,
  ...lightPickup,
  ...lightSuv,
  ...semiTrailer,
  ...newEnergy,
}
