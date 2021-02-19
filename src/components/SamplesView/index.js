// @flow weak

import React, { useState, useEffect } from "react"
import { styled } from "@material-ui/core/styles"
import SampleGrid from "../SampleGrid"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import AppsIcon from "@material-ui/icons/Apps"
import SlideshowIcon from "@material-ui/icons/Slideshow"
import TableChartIcon from "@material-ui/icons/TableChart"
import Box from "@material-ui/core/Box"
import ImportIcon from "@material-ui/icons/Publish"
import ImportPage from "../ImportPage"
import TransformPage from "../TransformPage"
import useIsDesktop from "../../hooks/use-is-desktop"
import useSummary from "../../hooks/use-summary"
import * as colors from "@material-ui/core/colors"
import SamplesTable from "../SamplesTable"
// import AddToGrid from "../AddToGrid"
import useAddSamples from "../../hooks/use-add-samples"

let loadOnce = 0

const Container = styled("div")({
  height: "100%",
  padding: 8,
  paddingBottom: 0,
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
})

const SampleCounter = styled("div")({
  fontSize: 14,
  color: colors.grey[600],
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  flexGrow: 1,
})

export const SamplesView = ({
  openSampleInputEditor,
  openSampleLabelEditor,
  user,
}) => {
  const isDesktop = useIsDesktop()
  const { summary } = useSummary()
  const [currentTab, changeTabState] = useState("grid")
  const addSamples = useAddSamples()

  const changeTab = (tab) => {
    changeTabState(tab)
    window.localStorage.lastSampleTab = tab
  }

  useEffect(() => {
    let answer
    fetch("http://localhost:3030/interfaceWithUDT")
      .then((response) => response.json())
      .then((data) => {
        answer = data
        logAnswer()
        populateGrid()
      })

    const logAnswer = () => {
      console.log(answer)
    }

    const populateGrid = () => {
      // if (!summary.samples || !summary.samples.length) {
      if (!loadOnce) {
        addSamples(answer)
        loadOnce = 1
      }
    }
  }, [])

  // try {
  //   console.log(
  //     `Object.values(summary.samples) = ${Object.values(
  //       summary.samples
  //     ).map((value) => console.log(value))}`
  //   )
  // } catch (e) {
  //   console.log(`Error: ${e}`)
  // }

  return (
    <Container>
      <Box display="flex">
        <Tabs value={currentTab} onChange={(e, newTab) => changeTab(newTab)}>
          <Tab icon={<ImportIcon />} label="Import" value="import" />
          <Tab icon={<SlideshowIcon />} label="Transform" value="transform" />
          <Tab icon={<AppsIcon />} label="Grid" value="grid" />
          <Tab icon={<TableChartIcon />} label="Table" value="table" />
        </Tabs>
        <SampleCounter>
          {(summary.samples || []).length} Samples
          <br />
          {(summary.samples || []).filter((s) => s?.hasAnnotation).length}{" "}
          Labels
        </SampleCounter>
      </Box>
      <Box paddingTop={2} />
      <Box flexGrow={1}>
        {currentTab === "import" && (
          <ImportPage
            isDesktop={isDesktop}
            onImportPageShouldExit={() => changeTab("grid")}
            user={user}
          />
        )}
        {currentTab === "transform" && <TransformPage />}
        {currentTab === "grid" && (
          <SampleGrid
            tablePaginationPadding={6}
            samples={summary.samples || []}
            onClick={(sampleIndex) => {
              openSampleLabelEditor(sampleIndex)
            }}
          />
        )}
        {currentTab === "table" && (
          <SamplesTable
            onClickSample={(sampleIndex) => {
              openSampleLabelEditor(sampleIndex)
            }}
          />
        )}
      </Box>
    </Container>
  )
}
export default SamplesView
