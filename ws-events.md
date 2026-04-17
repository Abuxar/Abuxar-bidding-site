# Socket.io Event Dictionary

## Client-to-Server Events

| Event Name     | Payload                                 | Description                                                   |
| :------------- | :-------------------------------------- | :------------------------------------------------------------ |
| `joinAuction`  | `{ auctionId: string }`                 | Client joins a specific auction room to receive live updates. |
| `leaveAuction` | `{ auctionId: string }`                 | Client leaves the auction room.                               |
| `placeBid`     | `{ auctionId: string, amount: number }` | Client attempts to place a new bid.                           |

## Server-to-Client Events

| Event Name           | Payload                                                                             | Description                                                                                  |
| :------------------- | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| `serverTime`         | `{ timestamp: number }`                                                             | Emitted on connection. Client uses this to calculate clock skew.                             |
| `bidAccepted`        | `{ auctionId: string, bidId: string, amount: number, bidderId: string }`            | Acknowledgment to the user who placed a valid bid.                                           |
| `bidRejected`        | `{ auctionId: string, reason: string }`                                             | Rejection notice if the bid is invalid (e.g. too low, auction ended, race condition failed). |
| `auctionUpdated`     | `{ auctionId: string, currentPrice: number, topBidderId: string, endTime: number }` | Broadcast to all room members when a bid succeeds or timer extends (anti-snipe).             |
| `auctionEnded`       | `{ auctionId: string, winnerId: string, finalPrice: number }`                       | Broadcast to all room members when the auction concludes.                                    |
| `outbidNotification` | `{ auctionId: string, newPrice: number }`                                           | Specific notification sent to a user when someone outbids them.                              |
