<template>
  <div>
    <gmap-map :center="center" :zoom="13" class="map"  ref="mapRef">
      <gmap-marker
        :position="marker.position"
        :clickable="true"
        @click="toggleInfoWin"
      >
        <info-window :opened="marker.isInfoOpen" v-if="isLoaded">{{address}}</info-window>
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import InfoWindow from "vue2-google-maps/dist/components/infoWindow";

export default {
  name: "GoogleMap",
  components: {
    InfoWindow
  },
  props: ["itemCoords"],
  data() {
    return {
      center: { lat: 32.088032, lng: 34.803139 },
      marker: {
        position: { lat: this.itemCoords.lat, lng: this.itemCoords.lng },
        isInfoOpen: false
      },
      address: "No valid address",
      isLoaded: false
    };
  },

  mounted() {
    this.geolocate();
    this.checkIfLoaded();
  },
  created() {},
  methods: {
    checkIfLoaded() {
      this.$refs.mapRef.$mapPromise
        .then(() => {
          this.isLoaded = true;
          return this.reverseGeolocate()
        })
        .then(address => this.address = address);
    },
    reverseGeolocate() {
      var geocoder = new google.maps.Geocoder();
      var latlng = {};
      latlng.lat = this.marker.position.lat;
      latlng.lng = this.marker.position.lng;
      return new Promise((resolve, reject) => {
        geocoder.geocode({ location: latlng }, (results, status) => {
           if (status == "OK") {
             resolve(results[0].formatted_address);
           }
         });
      })
    },
    toggleInfoWin() {
      this.marker.isInfoOpen = !this.marker.isInfoOpen;
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>