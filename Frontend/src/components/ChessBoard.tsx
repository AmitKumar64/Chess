import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from 'react';
import { MOVE } from "../screens/Game";

export const ChessBoard = ({ chess, board, socket, setBoard }: {
    chess: any;
    setBoard: any;
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
}) => {
    const [from, setFrom] = useState<null | Square>(null);
    const [to, setTo] = useState<null | Square>(null);

    return <div className="text-white-200">
        {board.map((row, i) => {
            return <div key={i} className="flex">
                {row.map((square, j) => {
                    const squareRep = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
                    const isSquare = (i + j) % 2 === 0;
                    return <div onClick={() => {
                        if (!from) {
                            setFrom(squareRep);
                        } else {
                            socket.send(JSON.stringify({
                                type: MOVE,
                                payload: {
                                    move: {
                                        from,
                                        to: squareRep
                                    }
                                }
                            }))
                            setFrom(null)
                            chess.move({
                                from,
                                to: squareRep
                            });
                            setBoard(chess.board());
                            console.log({
                                from,
                                to: squareRep
                            })
                        }
                    }} key={j} className={`w-16 h-16 ${isSquare ? 'bg-green-500' : 'bg-white'}`}>
                        <div className="w-full h-full flex justify-center">
                            <div className="h-full justify-center flex flex-col">
                                {square ? square.type : ""}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        })}
    </div>
}