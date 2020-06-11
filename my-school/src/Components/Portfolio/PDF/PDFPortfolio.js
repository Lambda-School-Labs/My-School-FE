import React from "react";
import { connect } from 'react-redux';
import {
  Page,
  Font,
  Text,
  View,
  Document,
  Image,
  BlobProvider
} from "@react-pdf/renderer";
import moment from 'moment';
import fontN from "../../../assets/Nunito_Sans/Nunito Sans Regular.ttf"
import fontP from "../../../assets/Pridi/Pridi Light.ttf"
import fontR from "../../../assets/Raleway/Raleway Medium.ttf"
import style from "./PDFStyles.js";
import { getAllActivitiesForUser } from '../../../Redux/actions/actions-portfolio';
import { Button, Box, Flex } from '@chakra-ui/core';
import timechange from '../../../utils/timeChange'


//importing fonts to PDF was overcomplicated omg
Font.register({
  family: "Nunito",
  src: fontN
})

Font.register({
  family: "Pridi",
  src: fontP
})

Font.register({
  family: "Raleway",
  src: fontR
})


// Create Document Page Component
const MyDocument = ({activities}) => {

  //Don't show null
  function noNull(item) {
    if (item === "null") {
      item = "";
    } else {
      return (item)
    }
  }

  //Creates actual document
 const PDFPortfolio = (
  

    <Document style={style.doc} title={''}>
      <Page size="A4" style={style.page}>
        <View >
          {/* for each activity, return a view. dates and times formatted */}
          {activities.map((a) => {
            let subdate = moment(a.completion_date).format('MMMM Do YYYY');
            let durtime = timechange(a.duration);

            return (
              <View>
                <View key={a.id} wrap={false}>
                  <Text style={style.title}>{a.name}</Text>
                  <Text style={style.subtitle}>Date: {subdate}      Subject: {a.subject}     Duration: {durtime}</Text>
                  <Text style={style.text}>{noNull(a.description)}</Text>
                </View>
            
                <View key={a.id} wrap={false}>
                {/* need to make sure this works with multiple images per activity */}
                  {a.photo && <Image src={`https${a.photo.slice(4, a.photo.length)}`} style={style.image} />}
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
 );


  // // show Link to activate new tab PDF
  return(
    <Box w="100%">
      <Flex direction="row"
        align="center"
        justify="center">
          <Button>
          <BlobProvider document={PDFPortfolio}>
            {({ url }) => <a href={url} target="_blank" rel="noopener noreferrer">PDF</a>}
          </BlobProvider>
        </Button>
        </Flex>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities,
    isLoading: state.portfolioReducer.isLoading,
    error: state.portfolioReducer.error,
  };
};

export default connect(mapStateToProps, { getAllActivitiesForUser })(MyDocument);