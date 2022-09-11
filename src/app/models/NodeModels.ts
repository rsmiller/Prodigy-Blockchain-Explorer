export class BooleanResponse
{
    success: boolean;
    exception: string;
    data: boolean;
}

export class BlockDtoResponse
{
    success: boolean;
    exception: string;
    data: Array<BlockDto>;
}

export class SingleBlockDtoResponse
{
    success: boolean;
    exception: string;
    data: BlockDto;
}

export class TransactionDtoResponse
{
    success: boolean;
    exception: string;
    data: Array<TransactionDto>;
}


export class SingleTransactionDtoResponse
{
    success: boolean;
    exception: string;
    data: TransactionDto;
}

export class BlockDto
{
    blockId: string;
    customerId: string;
    nonce: string;
    createdOn: number;
    minedOn: number;
    hash: string;
    identifier1: string;
    identifier2: string;
    identifier3: string;
    identifier4: string;
    identifier5: string;
    transactionList: Array<TransactionDto>;
}

export class TransactionDto
{
    txn: string;
    from: string;
    to: string;
    cert_block_id: string;
    created_on: number;
    amount: number;
}

export class TransactionPagedResult
{
    success: boolean;
    exception: string;
    totalResults: number;
    data: Array<TransactionDto>;
}

export class GeneralSearchResponse
{
    success: boolean;
    exception: string;
    data: GeneralSearchDto;
}

export class GeneralSearchDto
{
    blocks: Array<BlockDto>;
    transactions: Array<TransactionDto>;
    return_type: string;
}

export class BlockPageResponse
{
    success: boolean;
    exception: string;
    data: BlockPage;
}


export class BlockPage
{
    total_pages: number;
    current_page: number;
    next_page: number;
    blocks: Array<BlockDto>;
}