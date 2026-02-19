{
  description = "A post-modern dashboard for FRC teams, built by team 1458.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, flake-utils, nixpkgs }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = (import nixpkgs) {
          inherit system;
        };
      in
      rec {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            live-server
            nodePackages.vscode-langservers-extracted
            prettier
            uv
          ];

          shellHook = ''
            set -a
            source .env
            set +a
          '';
        };
      }
    );
}
