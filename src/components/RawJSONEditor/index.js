import React, { useState, useEffect } from "react"
import AceEditor from "react-ace"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import { useToasts } from "../Toasts"

import userPreConfiguration from "../UserPreConfiguration/UserPreConfiguration.json"

export const RawJSONEditor = ({ content, onSave }) => {
  const [jsonText, setJSONText] = useState("")
  const { addToast } = useToasts()

  const userPreConfigurationText = JSON.stringify(userPreConfiguration, null, 1)

  useEffect(() => {
    if (!content) return
    if (typeof content === "string") {
      setJSONText(content)
      console.log("##### JSON Editor as String")
    } else if (typeof content === "object") {
      setJSONText(JSON.stringify(content, null, "  "))
      console.log("##### JSON Editor as Object")
      console.log(`#### jsonText = ${jsonText}`)
    }
  }, [content])

  return (
    <Box position="relative" width="100%">
      <AceEditor
        theme="github"
        mode="javascript"
        width="100%"
        // value={jsonText}
        value={userPreConfigurationText}
        editorProps={{ $blockScrolling: Infinity }}
        onChange={(t) => setJSONText(t)}
      />
      <Box position="absolute" right={16} top={16}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            try {
              // onSave(JSON.parse(jsonText)) //original
              onSave(userPreConfiguration) //Added by Alvaro
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
