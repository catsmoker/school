---
title: "Paiement des frais"
date: 2026-10-01T09:00:00+01:00
draft: false
url: "/apply/payment/"
bodypartial: "payment-page"
bg_image: "images/backgrounds/page-title.jpg"
description : "Simulation de paiement : carte bancaire ou virement. Démo uniquement — la transaction réussit toujours."
---

<section class="section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card border-primary rounded-0 hover-shadow mb-5">
          <div class="card-body p-4 p-md-5">
            <h2 class="card-title text-center mb-4">Paiement des frais de scolarité</h2>
            <p class="text-center text-muted mb-4" id="demo-pay-summary"></p>

            <div class="alert alert-warning text-center mb-4">
              <strong>Démo uniquement, aucun paiement réel.</strong> Cette simulation réussit toujours. Aucune donnée bancaire n'est enregistrée ni transmise.
            </div>

            <div class="demo-msg" id="demo-payment-msg" style="display:none;"></div>

            <form id="demo-payment-form" novalidate>
              <input type="hidden" name="demo-pay-appno">
              <input type="hidden" name="demo-pay-name">
              <input type="hidden" name="demo-pay-program">
              <input type="hidden" name="demo-pay-amount">

              <div class="form-group mb-3">
                <label class="font-weight-bold d-block">Mode de paiement</label>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" class="custom-control-input" name="demo-pay-method" id="pay-card" value="Carte bancaire" checked>
                  <label class="custom-control-label" for="pay-card">Carte bancaire</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" class="custom-control-input" name="demo-pay-method" id="pay-transfer" value="Virement bancaire">
                  <label class="custom-control-label" for="pay-transfer">Virement bancaire</label>
                </div>
              </div>

              <div id="pay-card-fields">
                <div class="form-row">
                  <div class="form-group col-md-6 mb-3">
                    <label class="font-weight-bold">Numéro de carte <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="pay-card-number" placeholder="1234 5678 9012 3456" maxlength="19" required>
                  </div>
                  <div class="form-group col-md-6 mb-3">
                    <label class="font-weight-bold">Date d'expiration <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="pay-card-expiry" placeholder="MM/AA" maxlength="5" required>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6 mb-3">
                    <label class="font-weight-bold">Cryptogramme <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="pay-card-cvc" placeholder="123" maxlength="3" required>
                  </div>
                  <div class="form-group col-md-6 mb-3">
                    <label class="font-weight-bold">Titulaire <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="pay-card-holder" placeholder="NOM Prénom" required>
                  </div>
                </div>
              </div>

              <div id="pay-transfer-fields" style="display:none;">
                <div class="form-group mb-3">
                  <label class="font-weight-bold">Référence du virement <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="pay-transfer-ref" placeholder="VIR-..." required>
                </div>
                <div class="form-group mb-3">
                  <label class="font-weight-bold">Date du virement <span class="text-danger">*</span></label>
                  <input type="date" class="form-control" id="pay-transfer-date" required>
                </div>
              </div>

              <div class="text-center mt-4">
                <button type="submit" class="btn btn-success btn-lg px-5">Payer (démo — succès garanti)</button>
                <a href="/fees/" class="btn btn-outline-secondary btn-lg px-5 ml-3">Annuler</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
(function(){
  var app = JSON.parse(localStorage.getItem("demo_application") || "null");
  if (!app) { window.location.href = "/apply/"; return; }
  document.getElementById("demo-pay-summary").textContent = "Candidature n°" + app.number + " — " + app.fullname + " · " + app.program + " (" + app.level + ")";
  document.querySelector('input[name="demo-pay-appno"]').value = app.number;
  document.querySelector('input[name="demo-pay-name"]').value = app.fullname;
  document.querySelector('input[name="demo-pay-program"]').value = app.program + " (" + app.level + ")";
  document.querySelector('input[name="demo-pay-amount"]').value = "950,00 DH";

  var cardRadios = document.querySelectorAll('input[name="demo-pay-method"]');
  cardRadios.forEach(function(r){
    r.addEventListener("change", function(){
      document.getElementById("pay-card-fields").style.display = r.value === "Carte bancaire" ? "block" : "none";
      document.getElementById("pay-transfer-fields").style.display = r.value === "Virement bancaire" ? "block" : "none";
    });
  });
})();
</script>
