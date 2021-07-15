import useDatasetProperty from "../use-dataset-property"

export default () => {
  const ret = useDatasetProperty("interface")
  ret.iface = ret.interface
  // try {
  //   // Object.keys(ret.iface).map((k) =>
  //   //   console.log(`########## ret.iface keys = ${k}`)
  //   // )
  //   // console.log(`####### ret.iface.labels = ${ret.iface.labels[0]}`)
  //   ret.iface.labels = ["label 1", "label 2"]
  // } catch (err) {
  //   console.log(err)
  // }
  // ret.iface.labels = ["label 1", "label 2"]
  return ret // { interface, iface, updateInterface, interfaceLoading }
}
