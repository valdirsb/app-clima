<template>
  <v-app>
  
    <v-main>
      <v-container>

        <h1 class="text-center">APP CLIMA ATUAL</h1>

        <v-card class="my-3" >
          <v-card-text>
            <v-row justify='center' >
              <v-col cols="12" md="5">
                <h2>Insira o nome da cidade que deseja saber o Clima</h2>
              </v-col>
              <v-col  cols="12" md="5">
                <v-text-field
                  v-model="cidade"
                  label="Cidade"
                  placeholder="Ex: Recife"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2"  >
                <v-btn
                  color="success"
                  @click="inserirCidade(cidade)"
                >
                  Inserir
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-text>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  v-for="cidade in cidades "
                  :key="cidade.id"
                >
                  <CardClima class="my-2 mx-2" :cidade="cidade" v-on:excluir="excuirCidade" />
                </v-col>
              </v-row>
          </v-card-text>
        </v-card>

      </v-container>
      
    </v-main>
  </v-app>
</template>

<script>
import CardClima from './components/CardClima';
import api from "./service/api";

import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

export default {
  name: 'App',

  components: {
    CardClima
  },

  data: () => ({
    cidades: [],
    cidadesIniciais: ['São Paulo', 'Rio de Janeiro', 'Recife', 'Salvador, br', 'Manaus'],
    cidade: '',

  }),

  methods: {

    carregarCidades() {
      for (let index = 0; index < this.cidadesIniciais.length; index++) {
        const element = this.cidadesIniciais[index];

        this.inserirCidade(element)
        
      }
    },

    async inserirCidade(cidade){

        await api
        .get('/weather?q='+cidade+'&appid=a76a6652ee757589511c7ace6cdba773&units=metric&lang=pt_br')
        .then((response) => {
          this.cidades.push(response.data)

          Toast.fire({
              icon: 'success',
              title: 'cidade adicionada!'
          });
          this.cidade = '';

        })
        .catch((error)=> {
            Swal.fire("Failed!", error.response.data.message, "warning");
        });
    },

    excuirCidade(cidadeId){

      this.cidades = this.cidades.filter(function(i) { return i.id !== cidadeId; })

    },

  },

  mounted () {

      this.carregarCidades();
  },





};
</script>
