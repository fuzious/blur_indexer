export const RangeProtocolBlurVaultABI = [
    {
      "inputs": [
        { "internalType": "address", "name": "target", "type": "address" }
      ],
      "name": "AddressEmptyCode",
      "type": "error"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "account", "type": "address" }
      ],
      "name": "AddressInsufficientBalance",
      "type": "error"
    },
    { "inputs": [], "name": "ECDSAInvalidSignature", "type": "error" },
    {
      "inputs": [
        { "internalType": "uint256", "name": "length", "type": "uint256" }
      ],
      "name": "ECDSAInvalidSignatureLength",
      "type": "error"
    },
    {
      "inputs": [{ "internalType": "bytes32", "name": "s", "type": "bytes32" }],
      "name": "ECDSAInvalidSignatureS",
      "type": "error"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "implementation", "type": "address" }
      ],
      "name": "ERC1967InvalidImplementation",
      "type": "error"
    },
    { "inputs": [], "name": "ERC1967NonPayable", "type": "error" },
    {
      "inputs": [
        { "internalType": "address", "name": "spender", "type": "address" },
        { "internalType": "uint256", "name": "allowance", "type": "uint256" },
        { "internalType": "uint256", "name": "needed", "type": "uint256" }
      ],
      "name": "ERC20InsufficientAllowance",
      "type": "error"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "sender", "type": "address" },
        { "internalType": "uint256", "name": "balance", "type": "uint256" },
        { "internalType": "uint256", "name": "needed", "type": "uint256" }
      ],
      "name": "ERC20InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "approver", "type": "address" }
      ],
      "name": "ERC20InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "receiver", "type": "address" }
      ],
      "name": "ERC20InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "sender", "type": "address" }
      ],
      "name": "ERC20InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "spender", "type": "address" }
      ],
      "name": "ERC20InvalidSpender",
      "type": "error"
    },
    { "inputs": [], "name": "EnforcedPause", "type": "error" },
    { "inputs": [], "name": "ExpectedPause", "type": "error" },
    { "inputs": [], "name": "FailedInnerCall", "type": "error" },
    { "inputs": [], "name": "ImbalancedVaultAsset", "type": "error" },
    { "inputs": [], "name": "InsufficientUserBalance", "type": "error" },
    { "inputs": [], "name": "InsufficientVaultBalance", "type": "error" },
    {
      "inputs": [
        { "internalType": "address", "name": "account", "type": "address" },
        { "internalType": "uint256", "name": "currentNonce", "type": "uint256" }
      ],
      "name": "InvalidAccountNonce",
      "type": "error"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "name": "InvalidETHAmount",
      "type": "error"
    },
    { "inputs": [], "name": "InvalidInitialization", "type": "error" },
    {
      "inputs": [
        {
          "components": [
            { "internalType": "address", "name": "lender", "type": "address" },
            { "internalType": "address", "name": "borrower", "type": "address" },
            {
              "internalType": "contract ERC721",
              "name": "collection",
              "type": "address"
            },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "internalType": "uint256", "name": "startTime", "type": "uint256" },
            { "internalType": "uint256", "name": "rate", "type": "uint256" },
            {
              "internalType": "uint256",
              "name": "auctionStartBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "auctionDuration",
              "type": "uint256"
            }
          ],
          "internalType": "struct Lien",
          "name": "lien",
          "type": "tuple"
        },
        { "internalType": "uint256", "name": "lienId", "type": "uint256" }
      ],
      "name": "InvalidLien",
      "type": "error"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "managerFee", "type": "uint256" }
      ],
      "name": "InvalidManagerFee",
      "type": "error"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "recipient", "type": "address" }
      ],
      "name": "InvalidRecipient",
      "type": "error"
    },
    {
      "inputs": [
        { "internalType": "bytes", "name": "signature", "type": "bytes" }
      ],
      "name": "InvalidSignature",
      "type": "error"
    },
    { "inputs": [], "name": "NotInitializing", "type": "error" },
    {
      "inputs": [
        { "internalType": "uint256", "name": "deadline", "type": "uint256" }
      ],
      "name": "OutdatedOrder",
      "type": "error"
    },
    { "inputs": [], "name": "ReentrancyGuardReentrantCall", "type": "error" },
    { "inputs": [], "name": "RefinanceFailed", "type": "error" },
    { "inputs": [], "name": "UUPSUnauthorizedCallContext", "type": "error" },
    {
      "inputs": [
        { "internalType": "bytes32", "name": "slot", "type": "bytes32" }
      ],
      "name": "UUPSUnsupportedProxiableUUID",
      "type": "error"
    },
    { "inputs": [], "name": "ZeroBlendAddress", "type": "error" },
    { "inputs": [], "name": "ZeroBlurPoolAddress", "type": "error" },
    { "inputs": [], "name": "ZeroBurnAmount", "type": "error" },
    { "inputs": [], "name": "ZeroManagerAddress", "type": "error" },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "collection",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "lienId",
          "type": "uint256"
        }
      ],
      "name": "AuctionStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "shares",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "withdrawAmount",
          "type": "uint256"
        }
      ],
      "name": "Burned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "EIP712DomainChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "version",
          "type": "uint64"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "lienId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Loaned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "managerFee",
          "type": "uint256"
        }
      ],
      "name": "ManagerFeeSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "shares",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "depositAmount",
          "type": "uint256"
        }
      ],
      "name": "Minted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "collection",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "NFTLiquidated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "collection",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "lienId",
          "type": "uint256"
        }
      ],
      "name": "NFTSeized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousManager",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newManager",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "Upgraded",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "MAX_MANAGER_FEE",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "UPGRADE_INTERFACE_VERSION",
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" },
        { "internalType": "address", "name": "spender", "type": "address" }
      ],
      "name": "allowance",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "spender", "type": "address" },
        { "internalType": "uint256", "name": "value", "type": "uint256" }
      ],
      "name": "approve",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "account", "type": "address" }
      ],
      "name": "balanceOf",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "blend",
      "outputs": [
        { "internalType": "contract IBlend", "name": "", "type": "address" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "blurPool",
      "outputs": [
        { "internalType": "contract IBlurPool", "name": "", "type": "address" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "shares", "type": "uint256" }
      ],
      "name": "burn",
      "outputs": [
        { "internalType": "uint256", "name": "withdrawAmount", "type": "uint256" }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cleanUpLiensArray",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "collectManagerFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "eip712Domain",
      "outputs": [
        { "internalType": "bytes1", "name": "fields", "type": "bytes1" },
        { "internalType": "string", "name": "name", "type": "string" },
        { "internalType": "string", "name": "version", "type": "string" },
        { "internalType": "uint256", "name": "chainId", "type": "uint256" },
        {
          "internalType": "address",
          "name": "verifyingContract",
          "type": "address"
        },
        { "internalType": "bytes32", "name": "salt", "type": "bytes32" },
        { "internalType": "uint256[]", "name": "extensions", "type": "uint256[]" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            { "internalType": "address", "name": "lender", "type": "address" },
            { "internalType": "address", "name": "borrower", "type": "address" },
            {
              "internalType": "contract ERC721",
              "name": "collection",
              "type": "address"
            },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "internalType": "uint256", "name": "startTime", "type": "uint256" },
            { "internalType": "uint256", "name": "rate", "type": "uint256" },
            {
              "internalType": "uint256",
              "name": "auctionStartBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "auctionDuration",
              "type": "uint256"
            }
          ],
          "internalType": "struct Lien",
          "name": "lien",
          "type": "tuple"
        },
        { "internalType": "uint256", "name": "lienId", "type": "uint256" }
      ],
      "name": "getCurrentDebtByLien",
      "outputs": [
        { "internalType": "uint256", "name": "currentDebt", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCurrentlyOwnedDebt",
      "outputs": [
        { "internalType": "uint256", "name": "ownedDebt", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "from", "type": "uint256" },
        { "internalType": "uint256", "name": "to", "type": "uint256" }
      ],
      "name": "getLiensByIndex",
      "outputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "lender",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "borrower",
                  "type": "address"
                },
                {
                  "internalType": "contract ERC721",
                  "name": "collection",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startTime",
                  "type": "uint256"
                },
                { "internalType": "uint256", "name": "rate", "type": "uint256" },
                {
                  "internalType": "uint256",
                  "name": "auctionStartBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "auctionDuration",
                  "type": "uint256"
                }
              ],
              "internalType": "struct Lien",
              "name": "lien",
              "type": "tuple"
            },
            { "internalType": "uint256", "name": "lienId", "type": "uint256" }
          ],
          "internalType": "struct DataTypes.LienData[]",
          "name": "liensData",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            { "internalType": "address", "name": "lender", "type": "address" },
            { "internalType": "address", "name": "borrower", "type": "address" },
            {
              "internalType": "contract ERC721",
              "name": "collection",
              "type": "address"
            },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "internalType": "uint256", "name": "startTime", "type": "uint256" },
            { "internalType": "uint256", "name": "rate", "type": "uint256" },
            {
              "internalType": "uint256",
              "name": "auctionStartBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "auctionDuration",
              "type": "uint256"
            }
          ],
          "internalType": "struct Lien",
          "name": "lien",
          "type": "tuple"
        },
        { "internalType": "uint256", "name": "lienId", "type": "uint256" }
      ],
      "name": "getRefinancingAuctionRate",
      "outputs": [
        { "internalType": "uint256", "name": "rateLimit", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUnderlyingBalance",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "bytes", "name": "data", "type": "bytes" }],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "liensCount",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "collection", "type": "address" },
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
        { "internalType": "uint256", "name": "amount", "type": "uint256" },
        { "internalType": "address", "name": "recipient", "type": "address" },
        { "internalType": "uint256", "name": "deadline", "type": "uint256" },
        { "internalType": "bytes", "name": "signature", "type": "bytes" }
      ],
      "name": "liquidateNFT",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "manager",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "managerFee",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "name": "mint",
      "outputs": [
        { "internalType": "uint256", "name": "shares", "type": "uint256" }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" }
      ],
      "name": "nonces",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "", "type": "address" },
        { "internalType": "address", "name": "", "type": "address" },
        { "internalType": "uint256", "name": "", "type": "uint256" },
        { "internalType": "bytes", "name": "", "type": "bytes" }
      ],
      "name": "onERC721Received",
      "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "proxiableUUID",
      "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            { "internalType": "address", "name": "lender", "type": "address" },
            { "internalType": "address", "name": "borrower", "type": "address" },
            {
              "internalType": "contract ERC721",
              "name": "collection",
              "type": "address"
            },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "internalType": "uint256", "name": "startTime", "type": "uint256" },
            { "internalType": "uint256", "name": "rate", "type": "uint256" },
            {
              "internalType": "uint256",
              "name": "auctionStartBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "auctionDuration",
              "type": "uint256"
            }
          ],
          "internalType": "struct Lien",
          "name": "lien",
          "type": "tuple"
        },
        { "internalType": "uint256", "name": "lienId", "type": "uint256" },
        { "internalType": "uint256", "name": "rate", "type": "uint256" }
      ],
      "name": "refinanceAuction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "lender",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "borrower",
                  "type": "address"
                },
                {
                  "internalType": "contract ERC721",
                  "name": "collection",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startTime",
                  "type": "uint256"
                },
                { "internalType": "uint256", "name": "rate", "type": "uint256" },
                {
                  "internalType": "uint256",
                  "name": "auctionStartBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "auctionDuration",
                  "type": "uint256"
                }
              ],
              "internalType": "struct Lien",
              "name": "lien",
              "type": "tuple"
            },
            { "internalType": "uint256", "name": "lienId", "type": "uint256" }
          ],
          "internalType": "struct LienPointer[]",
          "name": "lienPointers",
          "type": "tuple[]"
        }
      ],
      "name": "seize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "managerFee", "type": "uint256" }
      ],
      "name": "setManagerFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            { "internalType": "address", "name": "lender", "type": "address" },
            { "internalType": "address", "name": "borrower", "type": "address" },
            {
              "internalType": "contract ERC721",
              "name": "collection",
              "type": "address"
            },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "internalType": "uint256", "name": "startTime", "type": "uint256" },
            { "internalType": "uint256", "name": "rate", "type": "uint256" },
            {
              "internalType": "uint256",
              "name": "auctionStartBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "auctionDuration",
              "type": "uint256"
            }
          ],
          "internalType": "struct Lien",
          "name": "lien",
          "type": "tuple"
        },
        { "internalType": "uint256", "name": "lienId", "type": "uint256" }
      ],
      "name": "startAuction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "to", "type": "address" },
        { "internalType": "uint256", "name": "value", "type": "uint256" }
      ],
      "name": "transfer",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "from", "type": "address" },
        { "internalType": "address", "name": "to", "type": "address" },
        { "internalType": "uint256", "name": "value", "type": "uint256" }
      ],
      "name": "transferFrom",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "newManager", "type": "address" }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newImplementation",
          "type": "address"
        },
        { "internalType": "bytes", "name": "data", "type": "bytes" }
      ],
      "name": "upgradeToAndCall",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    { "stateMutability": "payable", "type": "receive" }
  ]
  