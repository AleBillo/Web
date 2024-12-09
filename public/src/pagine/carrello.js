export default {
  template: `
    <div class="carrello-container container container-fluid">
      <div class="container col-md-8">
        <h1 v-if="nickname" class="text-center text-light">
          Il tuo carrello, <span class="nickname">{{ nickname }}</span>!
        </h1>
        <h1 v-else class="text-center text-light">
          Il tuo carrello: accedi per acquistare!
        </h1>
        
        <div v-if="carrello.length > 0" class="row">
          <div v-for="item in carrello" :key="item.id_vinyl" class="col-md-4 my-3">
            <div class="card">
              <img :src="'/media/' + item.image_url" class="card-img-top img-fluid" alt="Immagine Vinile">
              <div class="card-body">
                <h5 class="card-title">{{ item.vinyl_name }}</h5>
                <p class="card-text">Artista: {{ item.artist }}</p>
                <p class="card-text">Prezzo: €{{ item.price }}</p>
                <button class="btn btn-sm btn-danger" @click="rimuoviDalCarrello(item)">Rimuovi</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-light">
          <p>Il carrello è vuoto!</p>
        </div>
      </div>

      <div class="bg-light p-3 border rounded">
        <h4 class="text-center">Riepilogo Acquisti</h4>
        <ul class="list-group mb-3">
          <li v-for="item in carrello" :key="item.id_vinyl" class="list-group-item d-flex justify-content-between align-items-center">
            <span>{{ item.vinyl_name }}</span>
            <span>€{{ item.price }}</span>
          </li>
        </ul>
        <div class="d-flex justify-content-between">
          <strong>TOTALE:</strong>
          <strong>€{{ totale }}</strong>
        </div>
      </div>

      <div class="text-center my-3">
        <button 
          type="button" 
          class="btn btn-lg w-100 btnbuy"
          @click="gestisciAcquisto">
          Acquista
        </button>
      </div>
    </div>
  `,
  data() {
    return {
      carrello: [],
      nickname: '' // Valore iniziale vuoto
    };
  },
  created() {
    this.carrello = JSON.parse(localStorage.getItem('carrello')) || [];
    this.nickname = localStorage.getItem('nickname') || '';
  },
  methods: {
    rimuoviDalCarrello(item) {
      this.carrello = this.carrello.filter(prod => prod.id_vinyl !== item.id_vinyl);
      localStorage.setItem('carrello', JSON.stringify(this.carrello));
    },
    gestisciAcquisto() {
      if (!this.nickname || this.nickname.trim() === '') {
        // Se non sei autenticato, reindirizza a /login
        this.$router.push('/login');
      } else {
        // Aggiungi logica per gestire l'acquisto se necessario
        alert('Acquisto completato!');
      }
    }
  },
  computed: {
    totale() {
      return this.carrello.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
    }
  }
};
