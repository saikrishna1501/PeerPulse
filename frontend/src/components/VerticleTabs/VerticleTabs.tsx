import { Box, Grid, Tab, Tabs, Typography } from "@mui/material"
import { useEffect, useState } from "react";

type Props = {
  mapping?: {
    textOnTab: string,
    componentToRender: React.JSX.Element,
    order: number
  }[] | undefined
};

type TabPanelProps = {
  children?: React.ReactNode,
  index: number,
  value: number
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 5, pt: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const VerticalTabs = ({ mapping }: Props) => {

  const containerSectionGridSx = {
    '.MuiGrid-root.MuiGrid-item.GridContainer': { paddingTop: "56px" },
    p: 5,
    ml: 0,
  }

  const leftSectionGridSx = {
    // height: "100%",
    mt: 0,
    ml: 0,
    p: 5
  }

  const mainSectionGridSx = {
    // height: "100%",
    mt: 0,
    ml: 0,
    pl: 10
  }
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  const tabs = (): any => {
    return mapping!.map((item, index) => {
      return <Tab key={index} label={item.textOnTab} {...a11yProps(item.order)} />
    })
  }

  const tabPanels = (value: number) => {
    return mapping!.map((item,index) => {
      return <TabPanel key={index} value={value} index={index}>
          {item.componentToRender}
    </TabPanel>
    })
  }

  return (
    <>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', marginLeft: 0 }}
      >
        <Grid container spacing={2} sx={containerSectionGridSx} className="GridContainer">
          <Grid item xs={3} sx={leftSectionGridSx}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs"
              sx={{ borderRight: 1, borderColor: 'divider', marginLeft: 0 }}
            >

              {tabs()}

              {/* <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
            </Tabs>
          </Grid>
          <Grid item xs={9} sx={mainSectionGridSx}>
            {/* <TabPanel value={value} index={0}>
              {mapping[0].componentToRender}
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel> */}
            {tabPanels(value)}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default VerticalTabs;