<template>
  <v-card
    max-width="400"
    color="#385F73"
    dark
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 colorHeader" >
          {{cidade.name}}
        </v-list-item-title>
        <v-list-item-subtitle> {{cidade.weather[0].description}} </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col
          class="text-h3 colorHeader"
          cols="6"
        >
          {{parseInt(cidade.main.temp)}}&deg;C
        </v-col>
        <v-col cols="6">
          <v-img
            :src="'http://openweathermap.org/img/wn/'+cidade.weather[0].icon+'@2x.png'"
            alt="Sunny image"
            width="92"
          ></v-img>
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon class="mr-2">
        <v-icon>mdi-send</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{converterVelocidade(cidade.wind.speed).toFixed(1)}} km/h (Velocidade do Vento)</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon  class="mr-2">
        <v-icon>mdi-cloud-download</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{cidade.main.humidity}}% (Humidade do Ar)</v-list-item-subtitle>
    </v-list-item>


    <v-divider></v-divider>

    <v-card-actions>
      <v-btn @click="$emit('excluir',cidade.id )" color="error">
        Excluir
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {

    props: ['cidade'],
    name: 'Cardcidade',
    data () {
      return {
        
      }
    },

    methods: {

      converterVelocidade(valor){
        return valor*3.6;
      },

    }



}
</script>

<style>

.colorHeader{
  color: #fcc706;
}

</style>