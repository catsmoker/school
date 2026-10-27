---
title: "Connexion — Espace étudiant"
date: 2026-10-01T09:00:00+01:00
draft: false
url: "/login/"
bodypartial: "login-page"
bg_image: "images/backgrounds/page-title.jpg"
description : "Connectez-vous à votre espace étudiant. Identifiants démo affichés ci-dessous."
---

<section class="section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8">
        <div class="card border-primary rounded-0 hover-shadow mb-5">
          <div class="card-body p-4 p-md-5">
            <h2 class="card-title text-center mb-4">Connexion</h2>
            <p class="text-center text-muted mb-4">Espace étudiant de l'école — démo fonctionnelle.</p>

            <div class="demo-msg" id="demo-login-msg" style="display:none;"></div>

            <form id="demo-login-form" novalidate>
              <div class="form-group mb-3">
                <label class="font-weight-bold">Identifiant ou e-mail <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="demo-login" placeholder="amine.benali@ecole-demo.ma" required autofocus>
              </div>
              <div class="form-group mb-4">
                <label class="font-weight-bold">Mot de passe <span class="text-danger">*</span></label>
                <input type="password" class="form-control" id="demo-password" placeholder="••••••••" required>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary btn-lg px-4">Se connecter</button>
              </div>
            </form>

            <div class="text-center mt-4">
              <a href="/" class="btn btn-outline-secondary btn-sm">Retour à l'accueil</a>
            </div>
          </div>
        </div>

        <!-- Demo credentials panel -->
        <div class="card bg-light rounded-0 border-secondary">
          <div class="card-body p-3 p-md-4">
            <h5 class="card-title mb-3">Identifiants de démonstration</h5>
            <p class="small text-muted mb-3">Pour tester l'espace étudiant, utilisez l'un des comptes ci-dessous (mot de passe unique&nbsp;: <code>demo123</code>).</p>
            <table class="table table-sm table-borderless mb-0">
              <thead>
                <tr><th class="w-25">Étudiant</th><th>Identifiant / e-mail</th></tr>
              </thead>
              <tbody>
                <tr><td>Amine Benali — TS Développement Digital</td><td><code>amine.benali@ecole-demo.ma</code></td></tr>
                <tr><td>Sarah Tazi — T Gestion des Entreprises</td><td><code>sarah.tazi@ecole-demo.ma</code></td></tr>
                <tr><td>Karim Mansouri — TS Électromécanique</td><td><code>karim.mansouri@ecole-demo.ma</code></td></tr>
                <tr><td>Inès Berrada — Qualification Cuisine</td><td><code>ines.berrada@ecole-demo.ma</code></td></tr>
                <tr><td>Youssef Idrissi — T Infographie</td><td><code>youssef.idrissi@ecole-demo.ma</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
