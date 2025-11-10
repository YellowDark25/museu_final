document.onreadystatechange = function (e) {
   if (document.readyState === "complete") {
      if (history.state !== null) {
         if (history.state.params && history.state.params.length > 0) {
            loadSessionStorageValues(history.state.params);
         }
         $("#conteudo").load(history.state.page);
      } else {
         saveNavegation({ page: "index_firstpage.html" });
      }
   }
};

window.onpopstate = function (e) {
   if (e.state !== null) {
      if (e.state.params && e.state.params.length > 0) {
         loadSessionStorageValues(e.state.params);
      }
      $("#conteudo").load(e.state.page);
   }
};

function saveNavegation(frag) {
   history.pushState(frag, null, null);
   if (frag.params && frag.params.length > 0) {
      loadSessionStorageValues(frag.params);
   }
   $("#conteudo").load(frag.page);
}

function loadSessionStorageValues(list) {
   jQuery.each(list, function (idx, obj) {
      window.sessionStorage.setItem(obj.key, obj.value);
   });
}

$(document).ready(function () {

   $("#logoMuseu").on("click", function (event) {
      saveNavegation({ page: "index_firstpage.html" });
   });

   $("#btnBackHome").on("click", function (event) {
      window.location.replace(window.sessionStorage.getItem("path"));
   });

   //Sobre

   $("#btnMuseu").on("click", function (event) {
      saveNavegation({ page: "museu.html" });
   });

   $("#btnHerculano").on("click", function (event) {
       saveNavegation({ page: "herculano.html" });
   });
   $("#btnQuemFoi").on("click", function (event) {
       saveNavegation({ page: "quemfoi.html" });
   });
   
   $("#btnIdentidade").on("click", function(event) {
  saveNavegation({ page: "identidade.pdf" });
   });

   $("#btnDocumentos").on("click", function (event) {
       saveNavegation({ page: "Documentos.html" });
   });
   $("#btnOutros").on("click", function (event) {
       saveNavegation({ page: "outros.html" });
   });

   //Acervo

   $("#btnAcervo").on("click", function (event) {
       saveNavegation({ page: "acervo.html" });
   });

   //Calendário

   $("#btnCalendario").on("click", function (event) {
       saveNavegation({ page: "calendario.html" });
   });

   //Turismo
   $("#btnRoteiro").on("click", function (event) {
       saveNavegation({ page: "roteiro.html" });
   });
   $("#btnBarradoBugres").on("click", function (event) {
       saveNavegation({ page: "barra-do-bugres.html" });
   });
   $("#btn80Anos").on("click", function (event) {
       saveNavegation({ page: "80anos.html" });
   });
   $("#btnQuilombos").on("click", function (event) {
       saveNavegation({ page: "quilombos.html" });
   });
   $("#btnTerraIndigena").on("click", function (event) {
       saveNavegation({ page: "terra-indigena.html" });
   });

   //Biblioteca

   $("#btnPublicacoes").on("click", function (event) {
       saveNavegation({ page: "publicacoes.html" });
   });
   $("#btnPesquisas").on("click", function (event) {
       saveNavegation({ page: "pesquisas.html" });
   });
   $("#btnArtigos").on("click", function (event) {
       saveNavegation({ page: "artigos.html" });
   });
   $("#btnTcc").on("click", function (event) {
       saveNavegation({ page: "tcc.html" });
   });

   //Exposições

   $("#btnExposicaoTemporaria").on("click", function (event) {
       saveNavegation({ page: "exposicao-temporaria.html" });
   });
   $("#btnExposicaoPermanente").on("click", function (event) {
       saveNavegation({ page: "exposicao-permanente.html" });
   });
   $("#btnExposicaoVirtual").on("click", function (event) {
       saveNavegation({ page: "exposicao-virtual.html" });
   });
   $("#btnTour").on("click", function (event) {
       saveNavegation({ page: "tour.html" });
   });

   //Galeria

   $("#btnGaleria").on("click", function (event) {
       saveNavegation({ page: "galeria.html" });
   });

   //Rodapé

   $("#btnEquipe").on("click", function (event) {
       saveNavegation({ page: "equipe.html" });
   });

   $("#btnInformes").on("click", function (event) {
       saveNavegation({ page: "informes.html" });
   });



   });
