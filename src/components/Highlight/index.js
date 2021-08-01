import React from 'react';
import { Grid } from '@material-ui/core';
import HighLightCard from './HighLightCard';

Highlight.propTypes = {};

function Highlight({ report, selectedCountryId }) {
    // Du lieu report ngay cuoi cung
    const data = report && report.length ? report[report.length - 1] : [];

    const summary = [
        {
            title: 'Số ca mắc',
            count: data.Confirmed,
            type: 'confirmed'
        },
        {
            title: 'Số ca nhiễm ',
            count: data.Recovered,
            type: 'recovered'
        },
        {
            title: 'Số ca khỏi',
            count: data.Deaths,
            type: 'death'
        },

    ]
    return <Grid container spacing={3}>
        {summary.map((item) =>
            <Grid item sm="4" xs="12">
            <HighLightCard
                    title= {item.title}
                    count = {item.count}
                    type={item.type}
                />
            </Grid>    
                 )}
    </Grid>
}

export default Highlight;