#!/bin/bash
set -o errexit
set -o nounset
traperr() {
  echo "ERROR: ${BASH_SOURCE[1]} at about ${BASH_LINENO[0]}"
}

set -o errtrace
trap traperr ERR

# TODO: Must come from external file
NODE_VERSION=18.20.2
# Can come from external file
BASE_URL="https://nodejs.org/dist/"

case "$(uname -o)" in
Cygwin)
  OS='win'
  EXT='.zip'
  OS_ARCH="${PROCESSOR_ARCHITECTURE}"
  GPG_PROG="gpg2"
  ;;
GNU/Linux)
  OS='linux'
  EXT='.tar.xz'
  RAW_ARCH="$(dpkg --print-architecture)"
  OS_ARCH="${RAW_ARCH##*-}"
  GPG_PROG="gpg"
  ;;
esac

case "${OS_ARCH}" in
amd64 | AMD64)
  ARCH='x64'
  ;;
ppc64el)
  ARCH='ppc64le'
  ;;
s390x)
  ARCH='s390x'
  ;;
arm64 | ARM64)
  ARCH='arm64'
  ;;
armhf)
  ARCH='armv7l'
  ;;
i386 | X86)
  ARCH='x86'
  ;;
*)
  echo "unsupported architecture"
  exit 1
  ;;
esac

qualified_name="node-v${NODE_VERSION}-${OS}-${ARCH}"
if [[ ! -d "tools/${qualified_name}" ]]; then
  # https://github.com/nodejs/node?tab=readme-ov-file#release-keys
  "${GPG_PROG}" --keyserver hkps://keys.openpgp.org --recv-keys 4ED778F539E3634C779C87C6D7062848A1AB005C
  "${GPG_PROG}" --keyserver hkps://keys.openpgp.org --recv-keys 141F07595B7B3FFE74309A937405533BE57C7D57
  "${GPG_PROG}" --keyserver hkps://keys.openpgp.org --recv-keys 74F12602B6F1C4E913FAA37AD3A89613643B6201
  "${GPG_PROG}" --keyserver hkps://keys.openpgp.org --recv-keys DD792F5973C6DE52C432CBDAC77ABFA00DDBF2B7
  "${GPG_PROG}" --keyserver hkps://keys.openpgp.org --recv-keys CC68F5A3106FF448322E48ED27F5E38D5B0A215F
  "${GPG_PROG}" --keyserver hkps://keys.openpgp.org --recv-keys 8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600
  "${GPG_PROG}" --keyserver hkps://keys.openpgp.org --recv-keys C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8
  "${GPG_PROG}" --keyserver hkps://keys.openpgp.org --recv-keys 890C08DB8579162FEE0DF9DB8BEAB4DFCF555EF4
  "${GPG_PROG}" --keyserver hkps://keys.openpgp.org --recv-keys C82FA3AE1CBEDC6BE46B9360C43CEC45C17AB93C
  "${GPG_PROG}" --keyserver hkps://keys.openpgp.org --recv-keys 108F52B48DB57BB0CC439B2997B01419BD92F80A
  "${GPG_PROG}" --keyserver hkps://keys.openpgp.org --recv-keys A363A499291CBBC940DD62E41F10027AF002F8B0

  base_url="${BASE_URL:-https://nodejs.org/dist}"
  url="${base_url%/}/v${NODE_VERSION}/${qualified_name}${EXT}"
  echo "Downloading ${url}..."
  mkdir --parents tools
  pushd tools &>/dev/null
  curl --fail \
    --silent \
    --show-error \
    --location \
    --remote-name \
    --compressed \
    "${url}"
  curl --fail \
    --silent \
    --show-error \
    --location \
    --remote-name \
    "${base_url}/v${NODE_VERSION}/SHASUMS256.txt"
  curl --fail \
    --silent \
    --show-error \
    --location \
    --remote-name \
    "${base_url}/v${NODE_VERSION}/SHASUMS256.txt.sig"
  # https://github.com/nodejs/node#verifying-binaries
  "${GPG_PROG}" --verify SHASUMS256.txt.sig SHASUMS256.txt
  grep "${qualified_name}${EXT}" SHASUMS256.txt | sha256sum -c -
  rm SHASUMS256{.txt,.txt.sig}
  echo "Decompressing..."
  case "${EXT}" in
  .tar.xz)
    tar -xJf "${qualified_name}${EXT}" --no-same-owner
    ;;
  .zip)
    unzip -q "${qualified_name}${EXT}"
    chmod u+x ${qualified_name}/{corepack,node,npm,npx}
    ;;
  esac
  rm "${qualified_name}${EXT}"
  popd &>/dev/null
fi
case "${OS}" in
linux)
  path_prefix="tools/${qualified_name}/bin"
  ;;
win)
  path_prefix="tools/${qualified_name}"
  ;;
esac
PATH="$(pwd)/${path_prefix}:$(pwd)/node_modules/.bin:$PATH" "${0#./}" $@