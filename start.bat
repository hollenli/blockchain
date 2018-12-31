goto next
geth \
--identity "test" \
--rpc \
--rpcport "8545" \
--rpcapi "db,eth,net,web3" \
--datadir "E:\320work\homework\blockchain\project\chain"
--port "30303" \
--nodiscover \
console 2>>output.log
:next
geth --identity "test" --rpc --rpcport "8545" --rpcapi "db,eth,net,web3,personal" --datadir "E:\320work\homework\blockchain\project\chain" --port "30303" --nodiscover console 2>>output.log
