import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model token_usuario
 *
 */
export type token_usuarioModel = runtime.Types.Result.DefaultSelection<Prisma.$token_usuarioPayload>;
export type AggregateToken_usuario = {
    _count: Token_usuarioCountAggregateOutputType | null;
    _avg: Token_usuarioAvgAggregateOutputType | null;
    _sum: Token_usuarioSumAggregateOutputType | null;
    _min: Token_usuarioMinAggregateOutputType | null;
    _max: Token_usuarioMaxAggregateOutputType | null;
};
export type Token_usuarioAvgAggregateOutputType = {
    id_token: number | null;
    id_usuario: number | null;
};
export type Token_usuarioSumAggregateOutputType = {
    id_token: number | null;
    id_usuario: number | null;
};
export type Token_usuarioMinAggregateOutputType = {
    id_token: number | null;
    token: string | null;
    tipo: $Enums.TipoToken | null;
    expiracion: Date | null;
    usado: boolean | null;
    id_usuario: number | null;
    created_at: Date | null;
};
export type Token_usuarioMaxAggregateOutputType = {
    id_token: number | null;
    token: string | null;
    tipo: $Enums.TipoToken | null;
    expiracion: Date | null;
    usado: boolean | null;
    id_usuario: number | null;
    created_at: Date | null;
};
export type Token_usuarioCountAggregateOutputType = {
    id_token: number;
    token: number;
    tipo: number;
    expiracion: number;
    usado: number;
    id_usuario: number;
    created_at: number;
    _all: number;
};
export type Token_usuarioAvgAggregateInputType = {
    id_token?: true;
    id_usuario?: true;
};
export type Token_usuarioSumAggregateInputType = {
    id_token?: true;
    id_usuario?: true;
};
export type Token_usuarioMinAggregateInputType = {
    id_token?: true;
    token?: true;
    tipo?: true;
    expiracion?: true;
    usado?: true;
    id_usuario?: true;
    created_at?: true;
};
export type Token_usuarioMaxAggregateInputType = {
    id_token?: true;
    token?: true;
    tipo?: true;
    expiracion?: true;
    usado?: true;
    id_usuario?: true;
    created_at?: true;
};
export type Token_usuarioCountAggregateInputType = {
    id_token?: true;
    token?: true;
    tipo?: true;
    expiracion?: true;
    usado?: true;
    id_usuario?: true;
    created_at?: true;
    _all?: true;
};
export type Token_usuarioAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which token_usuario to aggregate.
     */
    where?: Prisma.token_usuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of token_usuarios to fetch.
     */
    orderBy?: Prisma.token_usuarioOrderByWithRelationInput | Prisma.token_usuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.token_usuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` token_usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` token_usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned token_usuarios
    **/
    _count?: true | Token_usuarioCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Token_usuarioAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Token_usuarioSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Token_usuarioMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Token_usuarioMaxAggregateInputType;
};
export type GetToken_usuarioAggregateType<T extends Token_usuarioAggregateArgs> = {
    [P in keyof T & keyof AggregateToken_usuario]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateToken_usuario[P]> : Prisma.GetScalarType<T[P], AggregateToken_usuario[P]>;
};
export type token_usuarioGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.token_usuarioWhereInput;
    orderBy?: Prisma.token_usuarioOrderByWithAggregationInput | Prisma.token_usuarioOrderByWithAggregationInput[];
    by: Prisma.Token_usuarioScalarFieldEnum[] | Prisma.Token_usuarioScalarFieldEnum;
    having?: Prisma.token_usuarioScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Token_usuarioCountAggregateInputType | true;
    _avg?: Token_usuarioAvgAggregateInputType;
    _sum?: Token_usuarioSumAggregateInputType;
    _min?: Token_usuarioMinAggregateInputType;
    _max?: Token_usuarioMaxAggregateInputType;
};
export type Token_usuarioGroupByOutputType = {
    id_token: number;
    token: string;
    tipo: $Enums.TipoToken;
    expiracion: Date;
    usado: boolean;
    id_usuario: number;
    created_at: Date;
    _count: Token_usuarioCountAggregateOutputType | null;
    _avg: Token_usuarioAvgAggregateOutputType | null;
    _sum: Token_usuarioSumAggregateOutputType | null;
    _min: Token_usuarioMinAggregateOutputType | null;
    _max: Token_usuarioMaxAggregateOutputType | null;
};
type GetToken_usuarioGroupByPayload<T extends token_usuarioGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Token_usuarioGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Token_usuarioGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Token_usuarioGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Token_usuarioGroupByOutputType[P]>;
}>>;
export type token_usuarioWhereInput = {
    AND?: Prisma.token_usuarioWhereInput | Prisma.token_usuarioWhereInput[];
    OR?: Prisma.token_usuarioWhereInput[];
    NOT?: Prisma.token_usuarioWhereInput | Prisma.token_usuarioWhereInput[];
    id_token?: Prisma.IntFilter<"token_usuario"> | number;
    token?: Prisma.StringFilter<"token_usuario"> | string;
    tipo?: Prisma.EnumTipoTokenFilter<"token_usuario"> | $Enums.TipoToken;
    expiracion?: Prisma.DateTimeFilter<"token_usuario"> | Date | string;
    usado?: Prisma.BoolFilter<"token_usuario"> | boolean;
    id_usuario?: Prisma.IntFilter<"token_usuario"> | number;
    created_at?: Prisma.DateTimeFilter<"token_usuario"> | Date | string;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.usuarioWhereInput>;
};
export type token_usuarioOrderByWithRelationInput = {
    id_token?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    expiracion?: Prisma.SortOrder;
    usado?: Prisma.SortOrder;
    id_usuario?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    usuario?: Prisma.usuarioOrderByWithRelationInput;
};
export type token_usuarioWhereUniqueInput = Prisma.AtLeast<{
    id_token?: number;
    token?: string;
    AND?: Prisma.token_usuarioWhereInput | Prisma.token_usuarioWhereInput[];
    OR?: Prisma.token_usuarioWhereInput[];
    NOT?: Prisma.token_usuarioWhereInput | Prisma.token_usuarioWhereInput[];
    tipo?: Prisma.EnumTipoTokenFilter<"token_usuario"> | $Enums.TipoToken;
    expiracion?: Prisma.DateTimeFilter<"token_usuario"> | Date | string;
    usado?: Prisma.BoolFilter<"token_usuario"> | boolean;
    id_usuario?: Prisma.IntFilter<"token_usuario"> | number;
    created_at?: Prisma.DateTimeFilter<"token_usuario"> | Date | string;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.usuarioWhereInput>;
}, "id_token" | "token">;
export type token_usuarioOrderByWithAggregationInput = {
    id_token?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    expiracion?: Prisma.SortOrder;
    usado?: Prisma.SortOrder;
    id_usuario?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.token_usuarioCountOrderByAggregateInput;
    _avg?: Prisma.token_usuarioAvgOrderByAggregateInput;
    _max?: Prisma.token_usuarioMaxOrderByAggregateInput;
    _min?: Prisma.token_usuarioMinOrderByAggregateInput;
    _sum?: Prisma.token_usuarioSumOrderByAggregateInput;
};
export type token_usuarioScalarWhereWithAggregatesInput = {
    AND?: Prisma.token_usuarioScalarWhereWithAggregatesInput | Prisma.token_usuarioScalarWhereWithAggregatesInput[];
    OR?: Prisma.token_usuarioScalarWhereWithAggregatesInput[];
    NOT?: Prisma.token_usuarioScalarWhereWithAggregatesInput | Prisma.token_usuarioScalarWhereWithAggregatesInput[];
    id_token?: Prisma.IntWithAggregatesFilter<"token_usuario"> | number;
    token?: Prisma.StringWithAggregatesFilter<"token_usuario"> | string;
    tipo?: Prisma.EnumTipoTokenWithAggregatesFilter<"token_usuario"> | $Enums.TipoToken;
    expiracion?: Prisma.DateTimeWithAggregatesFilter<"token_usuario"> | Date | string;
    usado?: Prisma.BoolWithAggregatesFilter<"token_usuario"> | boolean;
    id_usuario?: Prisma.IntWithAggregatesFilter<"token_usuario"> | number;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"token_usuario"> | Date | string;
};
export type token_usuarioCreateInput = {
    token: string;
    tipo: $Enums.TipoToken;
    expiracion: Date | string;
    usado?: boolean;
    created_at?: Date | string;
    usuario: Prisma.usuarioCreateNestedOneWithoutToken_usuarioInput;
};
export type token_usuarioUncheckedCreateInput = {
    id_token?: number;
    token: string;
    tipo: $Enums.TipoToken;
    expiracion: Date | string;
    usado?: boolean;
    id_usuario: number;
    created_at?: Date | string;
};
export type token_usuarioUpdateInput = {
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoTokenFieldUpdateOperationsInput | $Enums.TipoToken;
    expiracion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuario?: Prisma.usuarioUpdateOneRequiredWithoutToken_usuarioNestedInput;
};
export type token_usuarioUncheckedUpdateInput = {
    id_token?: Prisma.IntFieldUpdateOperationsInput | number;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoTokenFieldUpdateOperationsInput | $Enums.TipoToken;
    expiracion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type token_usuarioCreateManyInput = {
    id_token?: number;
    token: string;
    tipo: $Enums.TipoToken;
    expiracion: Date | string;
    usado?: boolean;
    id_usuario: number;
    created_at?: Date | string;
};
export type token_usuarioUpdateManyMutationInput = {
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoTokenFieldUpdateOperationsInput | $Enums.TipoToken;
    expiracion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type token_usuarioUncheckedUpdateManyInput = {
    id_token?: Prisma.IntFieldUpdateOperationsInput | number;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoTokenFieldUpdateOperationsInput | $Enums.TipoToken;
    expiracion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Token_usuarioListRelationFilter = {
    every?: Prisma.token_usuarioWhereInput;
    some?: Prisma.token_usuarioWhereInput;
    none?: Prisma.token_usuarioWhereInput;
};
export type token_usuarioOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type token_usuarioCountOrderByAggregateInput = {
    id_token?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    expiracion?: Prisma.SortOrder;
    usado?: Prisma.SortOrder;
    id_usuario?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type token_usuarioAvgOrderByAggregateInput = {
    id_token?: Prisma.SortOrder;
    id_usuario?: Prisma.SortOrder;
};
export type token_usuarioMaxOrderByAggregateInput = {
    id_token?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    expiracion?: Prisma.SortOrder;
    usado?: Prisma.SortOrder;
    id_usuario?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type token_usuarioMinOrderByAggregateInput = {
    id_token?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    expiracion?: Prisma.SortOrder;
    usado?: Prisma.SortOrder;
    id_usuario?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type token_usuarioSumOrderByAggregateInput = {
    id_token?: Prisma.SortOrder;
    id_usuario?: Prisma.SortOrder;
};
export type token_usuarioCreateNestedManyWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.token_usuarioCreateWithoutUsuarioInput, Prisma.token_usuarioUncheckedCreateWithoutUsuarioInput> | Prisma.token_usuarioCreateWithoutUsuarioInput[] | Prisma.token_usuarioUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.token_usuarioCreateOrConnectWithoutUsuarioInput | Prisma.token_usuarioCreateOrConnectWithoutUsuarioInput[];
    createMany?: Prisma.token_usuarioCreateManyUsuarioInputEnvelope;
    connect?: Prisma.token_usuarioWhereUniqueInput | Prisma.token_usuarioWhereUniqueInput[];
};
export type token_usuarioUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.token_usuarioCreateWithoutUsuarioInput, Prisma.token_usuarioUncheckedCreateWithoutUsuarioInput> | Prisma.token_usuarioCreateWithoutUsuarioInput[] | Prisma.token_usuarioUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.token_usuarioCreateOrConnectWithoutUsuarioInput | Prisma.token_usuarioCreateOrConnectWithoutUsuarioInput[];
    createMany?: Prisma.token_usuarioCreateManyUsuarioInputEnvelope;
    connect?: Prisma.token_usuarioWhereUniqueInput | Prisma.token_usuarioWhereUniqueInput[];
};
export type token_usuarioUpdateManyWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.token_usuarioCreateWithoutUsuarioInput, Prisma.token_usuarioUncheckedCreateWithoutUsuarioInput> | Prisma.token_usuarioCreateWithoutUsuarioInput[] | Prisma.token_usuarioUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.token_usuarioCreateOrConnectWithoutUsuarioInput | Prisma.token_usuarioCreateOrConnectWithoutUsuarioInput[];
    upsert?: Prisma.token_usuarioUpsertWithWhereUniqueWithoutUsuarioInput | Prisma.token_usuarioUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: Prisma.token_usuarioCreateManyUsuarioInputEnvelope;
    set?: Prisma.token_usuarioWhereUniqueInput | Prisma.token_usuarioWhereUniqueInput[];
    disconnect?: Prisma.token_usuarioWhereUniqueInput | Prisma.token_usuarioWhereUniqueInput[];
    delete?: Prisma.token_usuarioWhereUniqueInput | Prisma.token_usuarioWhereUniqueInput[];
    connect?: Prisma.token_usuarioWhereUniqueInput | Prisma.token_usuarioWhereUniqueInput[];
    update?: Prisma.token_usuarioUpdateWithWhereUniqueWithoutUsuarioInput | Prisma.token_usuarioUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?: Prisma.token_usuarioUpdateManyWithWhereWithoutUsuarioInput | Prisma.token_usuarioUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: Prisma.token_usuarioScalarWhereInput | Prisma.token_usuarioScalarWhereInput[];
};
export type token_usuarioUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.token_usuarioCreateWithoutUsuarioInput, Prisma.token_usuarioUncheckedCreateWithoutUsuarioInput> | Prisma.token_usuarioCreateWithoutUsuarioInput[] | Prisma.token_usuarioUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.token_usuarioCreateOrConnectWithoutUsuarioInput | Prisma.token_usuarioCreateOrConnectWithoutUsuarioInput[];
    upsert?: Prisma.token_usuarioUpsertWithWhereUniqueWithoutUsuarioInput | Prisma.token_usuarioUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: Prisma.token_usuarioCreateManyUsuarioInputEnvelope;
    set?: Prisma.token_usuarioWhereUniqueInput | Prisma.token_usuarioWhereUniqueInput[];
    disconnect?: Prisma.token_usuarioWhereUniqueInput | Prisma.token_usuarioWhereUniqueInput[];
    delete?: Prisma.token_usuarioWhereUniqueInput | Prisma.token_usuarioWhereUniqueInput[];
    connect?: Prisma.token_usuarioWhereUniqueInput | Prisma.token_usuarioWhereUniqueInput[];
    update?: Prisma.token_usuarioUpdateWithWhereUniqueWithoutUsuarioInput | Prisma.token_usuarioUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?: Prisma.token_usuarioUpdateManyWithWhereWithoutUsuarioInput | Prisma.token_usuarioUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: Prisma.token_usuarioScalarWhereInput | Prisma.token_usuarioScalarWhereInput[];
};
export type EnumTipoTokenFieldUpdateOperationsInput = {
    set?: $Enums.TipoToken;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type token_usuarioCreateWithoutUsuarioInput = {
    token: string;
    tipo: $Enums.TipoToken;
    expiracion: Date | string;
    usado?: boolean;
    created_at?: Date | string;
};
export type token_usuarioUncheckedCreateWithoutUsuarioInput = {
    id_token?: number;
    token: string;
    tipo: $Enums.TipoToken;
    expiracion: Date | string;
    usado?: boolean;
    created_at?: Date | string;
};
export type token_usuarioCreateOrConnectWithoutUsuarioInput = {
    where: Prisma.token_usuarioWhereUniqueInput;
    create: Prisma.XOR<Prisma.token_usuarioCreateWithoutUsuarioInput, Prisma.token_usuarioUncheckedCreateWithoutUsuarioInput>;
};
export type token_usuarioCreateManyUsuarioInputEnvelope = {
    data: Prisma.token_usuarioCreateManyUsuarioInput | Prisma.token_usuarioCreateManyUsuarioInput[];
    skipDuplicates?: boolean;
};
export type token_usuarioUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: Prisma.token_usuarioWhereUniqueInput;
    update: Prisma.XOR<Prisma.token_usuarioUpdateWithoutUsuarioInput, Prisma.token_usuarioUncheckedUpdateWithoutUsuarioInput>;
    create: Prisma.XOR<Prisma.token_usuarioCreateWithoutUsuarioInput, Prisma.token_usuarioUncheckedCreateWithoutUsuarioInput>;
};
export type token_usuarioUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: Prisma.token_usuarioWhereUniqueInput;
    data: Prisma.XOR<Prisma.token_usuarioUpdateWithoutUsuarioInput, Prisma.token_usuarioUncheckedUpdateWithoutUsuarioInput>;
};
export type token_usuarioUpdateManyWithWhereWithoutUsuarioInput = {
    where: Prisma.token_usuarioScalarWhereInput;
    data: Prisma.XOR<Prisma.token_usuarioUpdateManyMutationInput, Prisma.token_usuarioUncheckedUpdateManyWithoutUsuarioInput>;
};
export type token_usuarioScalarWhereInput = {
    AND?: Prisma.token_usuarioScalarWhereInput | Prisma.token_usuarioScalarWhereInput[];
    OR?: Prisma.token_usuarioScalarWhereInput[];
    NOT?: Prisma.token_usuarioScalarWhereInput | Prisma.token_usuarioScalarWhereInput[];
    id_token?: Prisma.IntFilter<"token_usuario"> | number;
    token?: Prisma.StringFilter<"token_usuario"> | string;
    tipo?: Prisma.EnumTipoTokenFilter<"token_usuario"> | $Enums.TipoToken;
    expiracion?: Prisma.DateTimeFilter<"token_usuario"> | Date | string;
    usado?: Prisma.BoolFilter<"token_usuario"> | boolean;
    id_usuario?: Prisma.IntFilter<"token_usuario"> | number;
    created_at?: Prisma.DateTimeFilter<"token_usuario"> | Date | string;
};
export type token_usuarioCreateManyUsuarioInput = {
    id_token?: number;
    token: string;
    tipo: $Enums.TipoToken;
    expiracion: Date | string;
    usado?: boolean;
    created_at?: Date | string;
};
export type token_usuarioUpdateWithoutUsuarioInput = {
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoTokenFieldUpdateOperationsInput | $Enums.TipoToken;
    expiracion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type token_usuarioUncheckedUpdateWithoutUsuarioInput = {
    id_token?: Prisma.IntFieldUpdateOperationsInput | number;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoTokenFieldUpdateOperationsInput | $Enums.TipoToken;
    expiracion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type token_usuarioUncheckedUpdateManyWithoutUsuarioInput = {
    id_token?: Prisma.IntFieldUpdateOperationsInput | number;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoTokenFieldUpdateOperationsInput | $Enums.TipoToken;
    expiracion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type token_usuarioSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_token?: boolean;
    token?: boolean;
    tipo?: boolean;
    expiracion?: boolean;
    usado?: boolean;
    id_usuario?: boolean;
    created_at?: boolean;
    usuario?: boolean | Prisma.usuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["token_usuario"]>;
export type token_usuarioSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_token?: boolean;
    token?: boolean;
    tipo?: boolean;
    expiracion?: boolean;
    usado?: boolean;
    id_usuario?: boolean;
    created_at?: boolean;
    usuario?: boolean | Prisma.usuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["token_usuario"]>;
export type token_usuarioSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_token?: boolean;
    token?: boolean;
    tipo?: boolean;
    expiracion?: boolean;
    usado?: boolean;
    id_usuario?: boolean;
    created_at?: boolean;
    usuario?: boolean | Prisma.usuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["token_usuario"]>;
export type token_usuarioSelectScalar = {
    id_token?: boolean;
    token?: boolean;
    tipo?: boolean;
    expiracion?: boolean;
    usado?: boolean;
    id_usuario?: boolean;
    created_at?: boolean;
};
export type token_usuarioOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_token" | "token" | "tipo" | "expiracion" | "usado" | "id_usuario" | "created_at", ExtArgs["result"]["token_usuario"]>;
export type token_usuarioInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.usuarioDefaultArgs<ExtArgs>;
};
export type token_usuarioIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.usuarioDefaultArgs<ExtArgs>;
};
export type token_usuarioIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.usuarioDefaultArgs<ExtArgs>;
};
export type $token_usuarioPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "token_usuario";
    objects: {
        usuario: Prisma.$usuarioPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_token: number;
        token: string;
        tipo: $Enums.TipoToken;
        expiracion: Date;
        usado: boolean;
        id_usuario: number;
        created_at: Date;
    }, ExtArgs["result"]["token_usuario"]>;
    composites: {};
};
export type token_usuarioGetPayload<S extends boolean | null | undefined | token_usuarioDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$token_usuarioPayload, S>;
export type token_usuarioCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<token_usuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Token_usuarioCountAggregateInputType | true;
};
export interface token_usuarioDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['token_usuario'];
        meta: {
            name: 'token_usuario';
        };
    };
    /**
     * Find zero or one Token_usuario that matches the filter.
     * @param {token_usuarioFindUniqueArgs} args - Arguments to find a Token_usuario
     * @example
     * // Get one Token_usuario
     * const token_usuario = await prisma.token_usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends token_usuarioFindUniqueArgs>(args: Prisma.SelectSubset<T, token_usuarioFindUniqueArgs<ExtArgs>>): Prisma.Prisma__token_usuarioClient<runtime.Types.Result.GetResult<Prisma.$token_usuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Token_usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {token_usuarioFindUniqueOrThrowArgs} args - Arguments to find a Token_usuario
     * @example
     * // Get one Token_usuario
     * const token_usuario = await prisma.token_usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends token_usuarioFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, token_usuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__token_usuarioClient<runtime.Types.Result.GetResult<Prisma.$token_usuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Token_usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {token_usuarioFindFirstArgs} args - Arguments to find a Token_usuario
     * @example
     * // Get one Token_usuario
     * const token_usuario = await prisma.token_usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends token_usuarioFindFirstArgs>(args?: Prisma.SelectSubset<T, token_usuarioFindFirstArgs<ExtArgs>>): Prisma.Prisma__token_usuarioClient<runtime.Types.Result.GetResult<Prisma.$token_usuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Token_usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {token_usuarioFindFirstOrThrowArgs} args - Arguments to find a Token_usuario
     * @example
     * // Get one Token_usuario
     * const token_usuario = await prisma.token_usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends token_usuarioFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, token_usuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__token_usuarioClient<runtime.Types.Result.GetResult<Prisma.$token_usuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Token_usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {token_usuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Token_usuarios
     * const token_usuarios = await prisma.token_usuario.findMany()
     *
     * // Get first 10 Token_usuarios
     * const token_usuarios = await prisma.token_usuario.findMany({ take: 10 })
     *
     * // Only select the `id_token`
     * const token_usuarioWithId_tokenOnly = await prisma.token_usuario.findMany({ select: { id_token: true } })
     *
     */
    findMany<T extends token_usuarioFindManyArgs>(args?: Prisma.SelectSubset<T, token_usuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$token_usuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Token_usuario.
     * @param {token_usuarioCreateArgs} args - Arguments to create a Token_usuario.
     * @example
     * // Create one Token_usuario
     * const Token_usuario = await prisma.token_usuario.create({
     *   data: {
     *     // ... data to create a Token_usuario
     *   }
     * })
     *
     */
    create<T extends token_usuarioCreateArgs>(args: Prisma.SelectSubset<T, token_usuarioCreateArgs<ExtArgs>>): Prisma.Prisma__token_usuarioClient<runtime.Types.Result.GetResult<Prisma.$token_usuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Token_usuarios.
     * @param {token_usuarioCreateManyArgs} args - Arguments to create many Token_usuarios.
     * @example
     * // Create many Token_usuarios
     * const token_usuario = await prisma.token_usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends token_usuarioCreateManyArgs>(args?: Prisma.SelectSubset<T, token_usuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Token_usuarios and returns the data saved in the database.
     * @param {token_usuarioCreateManyAndReturnArgs} args - Arguments to create many Token_usuarios.
     * @example
     * // Create many Token_usuarios
     * const token_usuario = await prisma.token_usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Token_usuarios and only return the `id_token`
     * const token_usuarioWithId_tokenOnly = await prisma.token_usuario.createManyAndReturn({
     *   select: { id_token: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends token_usuarioCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, token_usuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$token_usuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Token_usuario.
     * @param {token_usuarioDeleteArgs} args - Arguments to delete one Token_usuario.
     * @example
     * // Delete one Token_usuario
     * const Token_usuario = await prisma.token_usuario.delete({
     *   where: {
     *     // ... filter to delete one Token_usuario
     *   }
     * })
     *
     */
    delete<T extends token_usuarioDeleteArgs>(args: Prisma.SelectSubset<T, token_usuarioDeleteArgs<ExtArgs>>): Prisma.Prisma__token_usuarioClient<runtime.Types.Result.GetResult<Prisma.$token_usuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Token_usuario.
     * @param {token_usuarioUpdateArgs} args - Arguments to update one Token_usuario.
     * @example
     * // Update one Token_usuario
     * const token_usuario = await prisma.token_usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends token_usuarioUpdateArgs>(args: Prisma.SelectSubset<T, token_usuarioUpdateArgs<ExtArgs>>): Prisma.Prisma__token_usuarioClient<runtime.Types.Result.GetResult<Prisma.$token_usuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Token_usuarios.
     * @param {token_usuarioDeleteManyArgs} args - Arguments to filter Token_usuarios to delete.
     * @example
     * // Delete a few Token_usuarios
     * const { count } = await prisma.token_usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends token_usuarioDeleteManyArgs>(args?: Prisma.SelectSubset<T, token_usuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Token_usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {token_usuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Token_usuarios
     * const token_usuario = await prisma.token_usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends token_usuarioUpdateManyArgs>(args: Prisma.SelectSubset<T, token_usuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Token_usuarios and returns the data updated in the database.
     * @param {token_usuarioUpdateManyAndReturnArgs} args - Arguments to update many Token_usuarios.
     * @example
     * // Update many Token_usuarios
     * const token_usuario = await prisma.token_usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Token_usuarios and only return the `id_token`
     * const token_usuarioWithId_tokenOnly = await prisma.token_usuario.updateManyAndReturn({
     *   select: { id_token: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends token_usuarioUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, token_usuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$token_usuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Token_usuario.
     * @param {token_usuarioUpsertArgs} args - Arguments to update or create a Token_usuario.
     * @example
     * // Update or create a Token_usuario
     * const token_usuario = await prisma.token_usuario.upsert({
     *   create: {
     *     // ... data to create a Token_usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token_usuario we want to update
     *   }
     * })
     */
    upsert<T extends token_usuarioUpsertArgs>(args: Prisma.SelectSubset<T, token_usuarioUpsertArgs<ExtArgs>>): Prisma.Prisma__token_usuarioClient<runtime.Types.Result.GetResult<Prisma.$token_usuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Token_usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {token_usuarioCountArgs} args - Arguments to filter Token_usuarios to count.
     * @example
     * // Count the number of Token_usuarios
     * const count = await prisma.token_usuario.count({
     *   where: {
     *     // ... the filter for the Token_usuarios we want to count
     *   }
     * })
    **/
    count<T extends token_usuarioCountArgs>(args?: Prisma.Subset<T, token_usuarioCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Token_usuarioCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Token_usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Token_usuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Token_usuarioAggregateArgs>(args: Prisma.Subset<T, Token_usuarioAggregateArgs>): Prisma.PrismaPromise<GetToken_usuarioAggregateType<T>>;
    /**
     * Group by Token_usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {token_usuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends token_usuarioGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: token_usuarioGroupByArgs['orderBy'];
    } : {
        orderBy?: token_usuarioGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, token_usuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetToken_usuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the token_usuario model
     */
    readonly fields: token_usuarioFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for token_usuario.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__token_usuarioClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    usuario<T extends Prisma.usuarioDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarioDefaultArgs<ExtArgs>>): Prisma.Prisma__usuarioClient<runtime.Types.Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the token_usuario model
 */
export interface token_usuarioFieldRefs {
    readonly id_token: Prisma.FieldRef<"token_usuario", 'Int'>;
    readonly token: Prisma.FieldRef<"token_usuario", 'String'>;
    readonly tipo: Prisma.FieldRef<"token_usuario", 'TipoToken'>;
    readonly expiracion: Prisma.FieldRef<"token_usuario", 'DateTime'>;
    readonly usado: Prisma.FieldRef<"token_usuario", 'Boolean'>;
    readonly id_usuario: Prisma.FieldRef<"token_usuario", 'Int'>;
    readonly created_at: Prisma.FieldRef<"token_usuario", 'DateTime'>;
}
/**
 * token_usuario findUnique
 */
export type token_usuarioFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the token_usuario
     */
    select?: Prisma.token_usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the token_usuario
     */
    omit?: Prisma.token_usuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.token_usuarioInclude<ExtArgs> | null;
    /**
     * Filter, which token_usuario to fetch.
     */
    where: Prisma.token_usuarioWhereUniqueInput;
};
/**
 * token_usuario findUniqueOrThrow
 */
export type token_usuarioFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the token_usuario
     */
    select?: Prisma.token_usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the token_usuario
     */
    omit?: Prisma.token_usuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.token_usuarioInclude<ExtArgs> | null;
    /**
     * Filter, which token_usuario to fetch.
     */
    where: Prisma.token_usuarioWhereUniqueInput;
};
/**
 * token_usuario findFirst
 */
export type token_usuarioFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the token_usuario
     */
    select?: Prisma.token_usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the token_usuario
     */
    omit?: Prisma.token_usuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.token_usuarioInclude<ExtArgs> | null;
    /**
     * Filter, which token_usuario to fetch.
     */
    where?: Prisma.token_usuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of token_usuarios to fetch.
     */
    orderBy?: Prisma.token_usuarioOrderByWithRelationInput | Prisma.token_usuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for token_usuarios.
     */
    cursor?: Prisma.token_usuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` token_usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` token_usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of token_usuarios.
     */
    distinct?: Prisma.Token_usuarioScalarFieldEnum | Prisma.Token_usuarioScalarFieldEnum[];
};
/**
 * token_usuario findFirstOrThrow
 */
export type token_usuarioFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the token_usuario
     */
    select?: Prisma.token_usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the token_usuario
     */
    omit?: Prisma.token_usuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.token_usuarioInclude<ExtArgs> | null;
    /**
     * Filter, which token_usuario to fetch.
     */
    where?: Prisma.token_usuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of token_usuarios to fetch.
     */
    orderBy?: Prisma.token_usuarioOrderByWithRelationInput | Prisma.token_usuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for token_usuarios.
     */
    cursor?: Prisma.token_usuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` token_usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` token_usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of token_usuarios.
     */
    distinct?: Prisma.Token_usuarioScalarFieldEnum | Prisma.Token_usuarioScalarFieldEnum[];
};
/**
 * token_usuario findMany
 */
export type token_usuarioFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the token_usuario
     */
    select?: Prisma.token_usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the token_usuario
     */
    omit?: Prisma.token_usuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.token_usuarioInclude<ExtArgs> | null;
    /**
     * Filter, which token_usuarios to fetch.
     */
    where?: Prisma.token_usuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of token_usuarios to fetch.
     */
    orderBy?: Prisma.token_usuarioOrderByWithRelationInput | Prisma.token_usuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing token_usuarios.
     */
    cursor?: Prisma.token_usuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` token_usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` token_usuarios.
     */
    skip?: number;
    distinct?: Prisma.Token_usuarioScalarFieldEnum | Prisma.Token_usuarioScalarFieldEnum[];
};
/**
 * token_usuario create
 */
export type token_usuarioCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the token_usuario
     */
    select?: Prisma.token_usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the token_usuario
     */
    omit?: Prisma.token_usuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.token_usuarioInclude<ExtArgs> | null;
    /**
     * The data needed to create a token_usuario.
     */
    data: Prisma.XOR<Prisma.token_usuarioCreateInput, Prisma.token_usuarioUncheckedCreateInput>;
};
/**
 * token_usuario createMany
 */
export type token_usuarioCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many token_usuarios.
     */
    data: Prisma.token_usuarioCreateManyInput | Prisma.token_usuarioCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * token_usuario createManyAndReturn
 */
export type token_usuarioCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the token_usuario
     */
    select?: Prisma.token_usuarioSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the token_usuario
     */
    omit?: Prisma.token_usuarioOmit<ExtArgs> | null;
    /**
     * The data used to create many token_usuarios.
     */
    data: Prisma.token_usuarioCreateManyInput | Prisma.token_usuarioCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.token_usuarioIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * token_usuario update
 */
export type token_usuarioUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the token_usuario
     */
    select?: Prisma.token_usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the token_usuario
     */
    omit?: Prisma.token_usuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.token_usuarioInclude<ExtArgs> | null;
    /**
     * The data needed to update a token_usuario.
     */
    data: Prisma.XOR<Prisma.token_usuarioUpdateInput, Prisma.token_usuarioUncheckedUpdateInput>;
    /**
     * Choose, which token_usuario to update.
     */
    where: Prisma.token_usuarioWhereUniqueInput;
};
/**
 * token_usuario updateMany
 */
export type token_usuarioUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update token_usuarios.
     */
    data: Prisma.XOR<Prisma.token_usuarioUpdateManyMutationInput, Prisma.token_usuarioUncheckedUpdateManyInput>;
    /**
     * Filter which token_usuarios to update
     */
    where?: Prisma.token_usuarioWhereInput;
    /**
     * Limit how many token_usuarios to update.
     */
    limit?: number;
};
/**
 * token_usuario updateManyAndReturn
 */
export type token_usuarioUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the token_usuario
     */
    select?: Prisma.token_usuarioSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the token_usuario
     */
    omit?: Prisma.token_usuarioOmit<ExtArgs> | null;
    /**
     * The data used to update token_usuarios.
     */
    data: Prisma.XOR<Prisma.token_usuarioUpdateManyMutationInput, Prisma.token_usuarioUncheckedUpdateManyInput>;
    /**
     * Filter which token_usuarios to update
     */
    where?: Prisma.token_usuarioWhereInput;
    /**
     * Limit how many token_usuarios to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.token_usuarioIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * token_usuario upsert
 */
export type token_usuarioUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the token_usuario
     */
    select?: Prisma.token_usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the token_usuario
     */
    omit?: Prisma.token_usuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.token_usuarioInclude<ExtArgs> | null;
    /**
     * The filter to search for the token_usuario to update in case it exists.
     */
    where: Prisma.token_usuarioWhereUniqueInput;
    /**
     * In case the token_usuario found by the `where` argument doesn't exist, create a new token_usuario with this data.
     */
    create: Prisma.XOR<Prisma.token_usuarioCreateInput, Prisma.token_usuarioUncheckedCreateInput>;
    /**
     * In case the token_usuario was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.token_usuarioUpdateInput, Prisma.token_usuarioUncheckedUpdateInput>;
};
/**
 * token_usuario delete
 */
export type token_usuarioDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the token_usuario
     */
    select?: Prisma.token_usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the token_usuario
     */
    omit?: Prisma.token_usuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.token_usuarioInclude<ExtArgs> | null;
    /**
     * Filter which token_usuario to delete.
     */
    where: Prisma.token_usuarioWhereUniqueInput;
};
/**
 * token_usuario deleteMany
 */
export type token_usuarioDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which token_usuarios to delete
     */
    where?: Prisma.token_usuarioWhereInput;
    /**
     * Limit how many token_usuarios to delete.
     */
    limit?: number;
};
/**
 * token_usuario without action
 */
export type token_usuarioDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the token_usuario
     */
    select?: Prisma.token_usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the token_usuario
     */
    omit?: Prisma.token_usuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.token_usuarioInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=token_usuario.d.ts.map