import { useEffect, useState, useReducer } from "react"
import useActiveDatasetManager from "../use-active-dataset-manager"
import userPreConfiguration from "../../components/UserPreConfiguration/UserPreConfiguration.json"

export default (datasetPropertyKey: string) => {
  const [propVal, setPropVal] = useState()
  const [propVersion, incPropVersion] = useReducer((state) => state + 1, 0)
  const [dm] = useActiveDatasetManager()

  try {
    console.log(Object.keys(propVal))
  } catch {}

  // const configuration = {
  //   Name: "Stornoway Classification",
  //   type: "image_classification",
  //   labels: ["label 1", "label 2"],
  //   multiple: true,
  // }

  useEffect(() => {
    if (!dm || !datasetPropertyKey) return
    dm.on("dataset-property-changed", ({ key }) => {
      if (key === datasetPropertyKey) {
        incPropVersion()
      }
    })
  }, [dm, datasetPropertyKey])

  useEffect(() => {
    if (!dm || !datasetPropertyKey) return
    dm.getDatasetProperty(datasetPropertyKey).then((newPropVal) => {
      // setPropVal(newPropVal) //Original
      setPropVal(userPreConfiguration) //Added by Alvaro
    })
  }, [dm, propVersion, datasetPropertyKey])

  // interface -> updateInterface
  const updateFunctionKeyName = `update${datasetPropertyKey[0].toUpperCase()}${datasetPropertyKey.slice(
    1
  )}`

  if (!dm || !datasetPropertyKey)
    return {
      [`${datasetPropertyKey}Loading`]: true,
      [updateFunctionKeyName]: () => {
        throw new Error(`${datasetPropertyKey} isn't loaded`)
      },
    }

  return {
    [datasetPropertyKey]: propVal,
    [updateFunctionKeyName]: async (newPropVal) => {
      await dm.setDatasetProperty(datasetPropertyKey, newPropVal)
    },
  }
}
