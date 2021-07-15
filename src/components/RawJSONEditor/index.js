import React, { useState, useEffect } from "react"
import AceEditor from "react-ace"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import { useToasts } from "../Toasts"

export const RawJSONEditor = ({ content, onSave }) => {
  const [jsonText, setJSONText] = useState("")
  const { addToast } = useToasts()

  const changeContentJson = (cont) => {
    let contText = ""

    try {
      const contJson = JSON.parse(cont)
      contJson.interface.labels = ["label 1", "label 2", "label 3"]
      contText = JSON.stringify(contJson)
    } catch {}

    // const contText = JSON.stringify(contJson)

    return contText
  }

  const showContent = (cont) => console.log(cont)

  useEffect(() => {
    if (!content) return
    if (typeof content === "string") {
      setJSONText(content)
      console.log("##### JSON Editor as String")
    } else if (typeof content === "object") {
      setJSONText(JSON.stringify(content, null, "  "))
      console.log("##### JSON Editor as Object")
    }
  }, [content])
  return (
    <Box position="relative" width="100%">
      <AceEditor
        theme="github"
        mode="javascript"
        width="100%"
        value={jsonText}
        // value={changeContentJson(jsonText)}
        editorProps={{ $blockScrolling: Infinity }}
        onChange={(t) => setJSONText(t)}
      />
      {/* {showContent(jsonText)} */}
      <Box position="absolute" right={16} top={16}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            try {
              onSave(JSON.parse(jsonText))
            } catch (e) {
              addToast("Invalid JSON", "error")
            }
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  )
}

export default RawJSONEditor
