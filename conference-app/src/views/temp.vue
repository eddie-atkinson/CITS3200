<style>
</style>
 <template>
  <v-container>
    <link
      rel='stylesheet'
      href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
      integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
      crossorigin='anonymous'
    />
    <link rel='stylesheet' type='text/css' href='../css/temp.css' />

    <div class='container' v-for='item in headers' :key='item.time'>
      <div v-if='item.header===true'>
        <div class='row' style='text-align: center;'>
          <div class='time'>{{ item.time }}</div>
          <div class='col'>{{ item.name }}</div>
        </div>
        <div class='row' style='text-align: center;'>
          <div class='col'>{{ item.speaker }}</div>
        </div>
      </div>
      <div v-else>
        <div class='row'>
          <div class='time'>{{ item.time }}</div>
          <div class='col'>{{ item.name }} {{ item.speaker }}</div>
          <div class='col'>{{ item.name }} {{ item.speaker }}</div>
          <div class='col'>{{ item.name }} {{ item.speaker }}</div>
        </div>
      </div>

      <!-- Need to find a way to display data from sessions running simultaneously
      Sessions always start together, check if sessions start at same time -> display those events
      Build 1, 2, or 3 columns depending on the number of sessions running at one time.-->
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import { json } from './json/data.json';

export default {
  name: 'temp',
  components: {},
  data() {
    return {
      sessions: [
        {
          number: 1,
          start: '10:30',
        },
        {
          number: 2,
          start: '10:30',
        },
        {
          number: 3,
          start: '10:30',
        },
        {
          number: 7,
          start: '16:00',
        },
        {
          number: 8,
          start: '16:00',
        },
      ],
      headers: [
        {
          time: '7:00',
          name:
            'Registration - EXHIBITION AREA, LEVEL TWO, THE WESTIN HOTEL PERTH',
          header: true,
        },
        {
          time: '8:00',
          name: 'Welcome & Introduction',
          speaker: 'AB Fourie, The University of Western Australia, Australia',
          header: true,
        },
        {
          time: '',
          name:
            'Keynote Addresses and Plenary Session One - Grand Ballrooms 2 & 3',
          speaker:
            'CHAIR: AB Fourie, The University of Western Australia, Australia',
          header: true,
        },
        {
          time: '8:30',
          name: 'KEYNOTE: Why should we ‘think big’ on closure?',
          speaker: 'L Tyler, J Heyes, BHP, Australia',
          header: false,
        },
        {
          time: '9:00',
          name:
            'KEYNOTE: The action is where the social is! The ecosystem services concept and other ideas for enhancing stakeholder engagement in integrated mine closure planning.',
          speaker:
            'A Morrison-Saunders, Edith Cowan University, Australia; North West University, South Africa',
          header: false,
        },
        {
          time: '10:30',
          name:
            'Current practice and innovation in decommissioning, rehabilitation and monitoring on Barrow Island: applications for mine closure',
          speaker:
            'DA Jasper, Stantec, Australia; P Hoffman, Chevron, Australia; NC Banning, Stantec, Australia; GS Wiseman, Stantec, Canada; KE Stanbury, SJ Annison, GR Henderson, Stantec, Australia',
          header: false,
          session: 1,
        },
      ],
    };
  },
};
</script>
