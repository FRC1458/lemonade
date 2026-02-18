{
  description = "A post-modern dashboard for FRC teams, built by team 1458.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in {
      devShells.x86_64-linux.default = pkgs.mkShell {
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
	};
}
