import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model modulo_completado
 *
 */
export type modulo_completadoModel = runtime.Types.Result.DefaultSelection<Prisma.$modulo_completadoPayload>;
export type AggregateModulo_completado = {
    _count: Modulo_completadoCountAggregateOutputType | null;
    _avg: Modulo_completadoAvgAggregateOutputType | null;
    _sum: Modulo_completadoSumAggregateOutputType | null;
    _min: Modulo_completadoMinAggregateOutputType | null;
    _max: Modulo_completadoMaxAggregateOutputType | null;
};
export type Modulo_completadoAvgAggregateOutputType = {
    id_modulo_completado: number | null;
    id_usuario: number | null;
    id_modulo: number | null;
};
export type Modulo_completadoSumAggregateOutputType = {
    id_modulo_completado: number | null;
    id_usuario: number | null;
    id_modulo: number | null;
};
export type Modulo_completadoMinAggregateOutputType = {
    id_modulo_completado: number | null;
    id_usuario: number | null;
    id_modulo: number | null;
    completado: boolean | null;
    fecha_completado: Date | null;
};
export type Modulo_completadoMaxAggregateOutputType = {
    id_modulo_completado: number | null;
    id_usuario: number | null;
    id_modulo: number | null;
    completado: boolean | null;
    fecha_completado: Date | null;
};
export type Modulo_completadoCountAggregateOutputType = {
    id_modulo_completado: number;
    id_usuario: number;
    id_modulo: number;
    completado: number;
    fecha_completado: number;
    _all: number;
};
export type Modulo_completadoAvgAggregateInputType = {
    id_modulo_completado?: true;
    id_usuario?: true;
    id_modulo?: true;
};
export type Modulo_completadoSumAggregateInputType = {
    id_modulo_completado?: true;
    id_usuario?: true;
    id_modulo?: true;
};
export type Modulo_completadoMinAggregateInputType = {
    id_modulo_completado?: true;
    id_usuario?: true;
    id_modulo?: true;
    completado?: true;
    fecha_completado?: true;
};
export type Modulo_completadoMaxAggregateInputType = {
    id_modulo_completado?: true;
    id_usuario?: true;
    id_modulo?: true;
    completado?: true;
    fecha_completado?: true;
};
export type Modulo_completadoCountAggregateInputType = {
    id_modulo_completado?: true;
    id_usuario?: true;
    id_modulo?: true;
    completado?: true;
    fecha_completado?: true;
    _all?: true;
};
export type Modulo_completadoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which modulo_completado to aggregate.
     */
    where?: Prisma.modulo_completadoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of modulo_completados to fetch.
     */
    orderBy?: Prisma.modulo_completadoOrderByWithRelationInput | Prisma.modulo_completadoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.modulo_completadoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` modulo_completados from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` modulo_completados.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned modulo_completados
    **/
    _count?: true | Modulo_completadoCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Modulo_completadoAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Modulo_completadoSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Modulo_completadoMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Modulo_completadoMaxAggregateInputType;
};
export type GetModulo_completadoAggregateType<T extends Modulo_completadoAggregateArgs> = {
    [P in keyof T & keyof AggregateModulo_completado]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateModulo_completado[P]> : Prisma.GetScalarType<T[P], AggregateModulo_completado[P]>;
};
export type modulo_completadoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.modulo_completadoWhereInput;
    orderBy?: Prisma.modulo_completadoOrderByWithAggregationInput | Prisma.modulo_completadoOrderByWithAggregationInput[];
    by: Prisma.Modulo_completadoScalarFieldEnum[] | Prisma.Modulo_completadoScalarFieldEnum;
    having?: Prisma.modulo_completadoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Modulo_completadoCountAggregateInputType | true;
    _avg?: Modulo_completadoAvgAggregateInputType;
    _sum?: Modulo_completadoSumAggregateInputType;
    _min?: Modulo_completadoMinAggregateInputType;
    _max?: Modulo_completadoMaxAggregateInputType;
};
export type Modulo_completadoGroupByOutputType = {
    id_modulo_completado: number;
    id_usuario: number;
    id_modulo: number;
    completado: boolean;
    fecha_completado: Date | null;
    _count: Modulo_completadoCountAggregateOutputType | null;
    _avg: Modulo_completadoAvgAggregateOutputType | null;
    _sum: Modulo_completadoSumAggregateOutputType | null;
    _min: Modulo_completadoMinAggregateOutputType | null;
    _max: Modulo_completadoMaxAggregateOutputType | null;
};
type GetModulo_completadoGroupByPayload<T extends modulo_completadoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Modulo_completadoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Modulo_completadoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Modulo_completadoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Modulo_completadoGroupByOutputType[P]>;
}>>;
export type modulo_completadoWhereInput = {
    AND?: Prisma.modulo_completadoWhereInput | Prisma.modulo_completadoWhereInput[];
    OR?: Prisma.modulo_completadoWhereInput[];
    NOT?: Prisma.modulo_completadoWhereInput | Prisma.modulo_completadoWhereInput[];
    id_modulo_completado?: Prisma.IntFilter<"modulo_completado"> | number;
    id_usuario?: Prisma.IntFilter<"modulo_completado"> | number;
    id_modulo?: Prisma.IntFilter<"modulo_completado"> | number;
    completado?: Prisma.BoolFilter<"modulo_completado"> | boolean;
    fecha_completado?: Prisma.DateTimeNullableFilter<"modulo_completado"> | Date | string | null;
    modulo?: Prisma.XOR<Prisma.ModuloScalarRelationFilter, Prisma.moduloWhereInput>;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.usuarioWhereInput>;
};
export type modulo_completadoOrderByWithRelationInput = {
    id_modulo_completado?: Prisma.SortOrder;
    id_usuario?: Prisma.SortOrder;
    id_modulo?: Prisma.SortOrder;
    completado?: Prisma.SortOrder;
    fecha_completado?: Prisma.SortOrderInput | Prisma.SortOrder;
    modulo?: Prisma.moduloOrderByWithRelationInput;
    usuario?: Prisma.usuarioOrderByWithRelationInput;
};
export type modulo_completadoWhereUniqueInput = Prisma.AtLeast<{
    id_modulo_completado?: number;
    id_usuario_id_modulo?: Prisma.modulo_completadoId_usuarioId_moduloCompoundUniqueInput;
    AND?: Prisma.modulo_completadoWhereInput | Prisma.modulo_completadoWhereInput[];
    OR?: Prisma.modulo_completadoWhereInput[];
    NOT?: Prisma.modulo_completadoWhereInput | Prisma.modulo_completadoWhereInput[];
    id_usuario?: Prisma.IntFilter<"modulo_completado"> | number;
    id_modulo?: Prisma.IntFilter<"modulo_completado"> | number;
    completado?: Prisma.BoolFilter<"modulo_completado"> | boolean;
    fecha_completado?: Prisma.DateTimeNullableFilter<"modulo_completado"> | Date | string | null;
    modulo?: Prisma.XOR<Prisma.ModuloScalarRelationFilter, Prisma.moduloWhereInput>;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.usuarioWhereInput>;
}, "id_modulo_completado" | "id_usuario_id_modulo">;
export type modulo_completadoOrderByWithAggregationInput = {
    id_modulo_completado?: Prisma.SortOrder;
    id_usuario?: Prisma.SortOrder;
    id_modulo?: Prisma.SortOrder;
    completado?: Prisma.SortOrder;
    fecha_completado?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.modulo_completadoCountOrderByAggregateInput;
    _avg?: Prisma.modulo_completadoAvgOrderByAggregateInput;
    _max?: Prisma.modulo_completadoMaxOrderByAggregateInput;
    _min?: Prisma.modulo_completadoMinOrderByAggregateInput;
    _sum?: Prisma.modulo_completadoSumOrderByAggregateInput;
};
export type modulo_completadoScalarWhereWithAggregatesInput = {
    AND?: Prisma.modulo_completadoScalarWhereWithAggregatesInput | Prisma.modulo_completadoScalarWhereWithAggregatesInput[];
    OR?: Prisma.modulo_completadoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.modulo_completadoScalarWhereWithAggregatesInput | Prisma.modulo_completadoScalarWhereWithAggregatesInput[];
    id_modulo_completado?: Prisma.IntWithAggregatesFilter<"modulo_completado"> | number;
    id_usuario?: Prisma.IntWithAggregatesFilter<"modulo_completado"> | number;
    id_modulo?: Prisma.IntWithAggregatesFilter<"modulo_completado"> | number;
    completado?: Prisma.BoolWithAggregatesFilter<"modulo_completado"> | boolean;
    fecha_completado?: Prisma.DateTimeNullableWithAggregatesFilter<"modulo_completado"> | Date | string | null;
};
export type modulo_completadoCreateInput = {
    completado?: boolean;
    fecha_completado?: Date | string | null;
    modulo: Prisma.moduloCreateNestedOneWithoutModulo_completadoInput;
    usuario: Prisma.usuarioCreateNestedOneWithoutModulo_completadoInput;
};
export type modulo_completadoUncheckedCreateInput = {
    id_modulo_completado?: number;
    id_usuario: number;
    id_modulo: number;
    completado?: boolean;
    fecha_completado?: Date | string | null;
};
export type modulo_completadoUpdateInput = {
    completado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fecha_completado?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    modulo?: Prisma.moduloUpdateOneRequiredWithoutModulo_completadoNestedInput;
    usuario?: Prisma.usuarioUpdateOneRequiredWithoutModulo_completadoNestedInput;
};
export type modulo_completadoUncheckedUpdateInput = {
    id_modulo_completado?: Prisma.IntFieldUpdateOperationsInput | number;
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    id_modulo?: Prisma.IntFieldUpdateOperationsInput | number;
    completado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fecha_completado?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type modulo_completadoCreateManyInput = {
    id_modulo_completado?: number;
    id_usuario: number;
    id_modulo: number;
    completado?: boolean;
    fecha_completado?: Date | string | null;
};
export type modulo_completadoUpdateManyMutationInput = {
    completado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fecha_completado?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type modulo_completadoUncheckedUpdateManyInput = {
    id_modulo_completado?: Prisma.IntFieldUpdateOperationsInput | number;
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    id_modulo?: Prisma.IntFieldUpdateOperationsInput | number;
    completado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fecha_completado?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Modulo_completadoListRelationFilter = {
    every?: Prisma.modulo_completadoWhereInput;
    some?: Prisma.modulo_completadoWhereInput;
    none?: Prisma.modulo_completadoWhereInput;
};
export type modulo_completadoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type modulo_completadoId_usuarioId_moduloCompoundUniqueInput = {
    id_usuario: number;
    id_modulo: number;
};
export type modulo_completadoCountOrderByAggregateInput = {
    id_modulo_completado?: Prisma.SortOrder;
    id_usuario?: Prisma.SortOrder;
    id_modulo?: Prisma.SortOrder;
    completado?: Prisma.SortOrder;
    fecha_completado?: Prisma.SortOrder;
};
export type modulo_completadoAvgOrderByAggregateInput = {
    id_modulo_completado?: Prisma.SortOrder;
    id_usuario?: Prisma.SortOrder;
    id_modulo?: Prisma.SortOrder;
};
export type modulo_completadoMaxOrderByAggregateInput = {
    id_modulo_completado?: Prisma.SortOrder;
    id_usuario?: Prisma.SortOrder;
    id_modulo?: Prisma.SortOrder;
    completado?: Prisma.SortOrder;
    fecha_completado?: Prisma.SortOrder;
};
export type modulo_completadoMinOrderByAggregateInput = {
    id_modulo_completado?: Prisma.SortOrder;
    id_usuario?: Prisma.SortOrder;
    id_modulo?: Prisma.SortOrder;
    completado?: Prisma.SortOrder;
    fecha_completado?: Prisma.SortOrder;
};
export type modulo_completadoSumOrderByAggregateInput = {
    id_modulo_completado?: Prisma.SortOrder;
    id_usuario?: Prisma.SortOrder;
    id_modulo?: Prisma.SortOrder;
};
export type modulo_completadoCreateNestedManyWithoutModuloInput = {
    create?: Prisma.XOR<Prisma.modulo_completadoCreateWithoutModuloInput, Prisma.modulo_completadoUncheckedCreateWithoutModuloInput> | Prisma.modulo_completadoCreateWithoutModuloInput[] | Prisma.modulo_completadoUncheckedCreateWithoutModuloInput[];
    connectOrCreate?: Prisma.modulo_completadoCreateOrConnectWithoutModuloInput | Prisma.modulo_completadoCreateOrConnectWithoutModuloInput[];
    createMany?: Prisma.modulo_completadoCreateManyModuloInputEnvelope;
    connect?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
};
export type modulo_completadoUncheckedCreateNestedManyWithoutModuloInput = {
    create?: Prisma.XOR<Prisma.modulo_completadoCreateWithoutModuloInput, Prisma.modulo_completadoUncheckedCreateWithoutModuloInput> | Prisma.modulo_completadoCreateWithoutModuloInput[] | Prisma.modulo_completadoUncheckedCreateWithoutModuloInput[];
    connectOrCreate?: Prisma.modulo_completadoCreateOrConnectWithoutModuloInput | Prisma.modulo_completadoCreateOrConnectWithoutModuloInput[];
    createMany?: Prisma.modulo_completadoCreateManyModuloInputEnvelope;
    connect?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
};
export type modulo_completadoUpdateManyWithoutModuloNestedInput = {
    create?: Prisma.XOR<Prisma.modulo_completadoCreateWithoutModuloInput, Prisma.modulo_completadoUncheckedCreateWithoutModuloInput> | Prisma.modulo_completadoCreateWithoutModuloInput[] | Prisma.modulo_completadoUncheckedCreateWithoutModuloInput[];
    connectOrCreate?: Prisma.modulo_completadoCreateOrConnectWithoutModuloInput | Prisma.modulo_completadoCreateOrConnectWithoutModuloInput[];
    upsert?: Prisma.modulo_completadoUpsertWithWhereUniqueWithoutModuloInput | Prisma.modulo_completadoUpsertWithWhereUniqueWithoutModuloInput[];
    createMany?: Prisma.modulo_completadoCreateManyModuloInputEnvelope;
    set?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    disconnect?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    delete?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    connect?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    update?: Prisma.modulo_completadoUpdateWithWhereUniqueWithoutModuloInput | Prisma.modulo_completadoUpdateWithWhereUniqueWithoutModuloInput[];
    updateMany?: Prisma.modulo_completadoUpdateManyWithWhereWithoutModuloInput | Prisma.modulo_completadoUpdateManyWithWhereWithoutModuloInput[];
    deleteMany?: Prisma.modulo_completadoScalarWhereInput | Prisma.modulo_completadoScalarWhereInput[];
};
export type modulo_completadoUncheckedUpdateManyWithoutModuloNestedInput = {
    create?: Prisma.XOR<Prisma.modulo_completadoCreateWithoutModuloInput, Prisma.modulo_completadoUncheckedCreateWithoutModuloInput> | Prisma.modulo_completadoCreateWithoutModuloInput[] | Prisma.modulo_completadoUncheckedCreateWithoutModuloInput[];
    connectOrCreate?: Prisma.modulo_completadoCreateOrConnectWithoutModuloInput | Prisma.modulo_completadoCreateOrConnectWithoutModuloInput[];
    upsert?: Prisma.modulo_completadoUpsertWithWhereUniqueWithoutModuloInput | Prisma.modulo_completadoUpsertWithWhereUniqueWithoutModuloInput[];
    createMany?: Prisma.modulo_completadoCreateManyModuloInputEnvelope;
    set?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    disconnect?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    delete?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    connect?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    update?: Prisma.modulo_completadoUpdateWithWhereUniqueWithoutModuloInput | Prisma.modulo_completadoUpdateWithWhereUniqueWithoutModuloInput[];
    updateMany?: Prisma.modulo_completadoUpdateManyWithWhereWithoutModuloInput | Prisma.modulo_completadoUpdateManyWithWhereWithoutModuloInput[];
    deleteMany?: Prisma.modulo_completadoScalarWhereInput | Prisma.modulo_completadoScalarWhereInput[];
};
export type modulo_completadoCreateNestedManyWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.modulo_completadoCreateWithoutUsuarioInput, Prisma.modulo_completadoUncheckedCreateWithoutUsuarioInput> | Prisma.modulo_completadoCreateWithoutUsuarioInput[] | Prisma.modulo_completadoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.modulo_completadoCreateOrConnectWithoutUsuarioInput | Prisma.modulo_completadoCreateOrConnectWithoutUsuarioInput[];
    createMany?: Prisma.modulo_completadoCreateManyUsuarioInputEnvelope;
    connect?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
};
export type modulo_completadoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.modulo_completadoCreateWithoutUsuarioInput, Prisma.modulo_completadoUncheckedCreateWithoutUsuarioInput> | Prisma.modulo_completadoCreateWithoutUsuarioInput[] | Prisma.modulo_completadoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.modulo_completadoCreateOrConnectWithoutUsuarioInput | Prisma.modulo_completadoCreateOrConnectWithoutUsuarioInput[];
    createMany?: Prisma.modulo_completadoCreateManyUsuarioInputEnvelope;
    connect?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
};
export type modulo_completadoUpdateManyWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.modulo_completadoCreateWithoutUsuarioInput, Prisma.modulo_completadoUncheckedCreateWithoutUsuarioInput> | Prisma.modulo_completadoCreateWithoutUsuarioInput[] | Prisma.modulo_completadoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.modulo_completadoCreateOrConnectWithoutUsuarioInput | Prisma.modulo_completadoCreateOrConnectWithoutUsuarioInput[];
    upsert?: Prisma.modulo_completadoUpsertWithWhereUniqueWithoutUsuarioInput | Prisma.modulo_completadoUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: Prisma.modulo_completadoCreateManyUsuarioInputEnvelope;
    set?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    disconnect?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    delete?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    connect?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    update?: Prisma.modulo_completadoUpdateWithWhereUniqueWithoutUsuarioInput | Prisma.modulo_completadoUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?: Prisma.modulo_completadoUpdateManyWithWhereWithoutUsuarioInput | Prisma.modulo_completadoUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: Prisma.modulo_completadoScalarWhereInput | Prisma.modulo_completadoScalarWhereInput[];
};
export type modulo_completadoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.modulo_completadoCreateWithoutUsuarioInput, Prisma.modulo_completadoUncheckedCreateWithoutUsuarioInput> | Prisma.modulo_completadoCreateWithoutUsuarioInput[] | Prisma.modulo_completadoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.modulo_completadoCreateOrConnectWithoutUsuarioInput | Prisma.modulo_completadoCreateOrConnectWithoutUsuarioInput[];
    upsert?: Prisma.modulo_completadoUpsertWithWhereUniqueWithoutUsuarioInput | Prisma.modulo_completadoUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: Prisma.modulo_completadoCreateManyUsuarioInputEnvelope;
    set?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    disconnect?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    delete?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    connect?: Prisma.modulo_completadoWhereUniqueInput | Prisma.modulo_completadoWhereUniqueInput[];
    update?: Prisma.modulo_completadoUpdateWithWhereUniqueWithoutUsuarioInput | Prisma.modulo_completadoUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?: Prisma.modulo_completadoUpdateManyWithWhereWithoutUsuarioInput | Prisma.modulo_completadoUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: Prisma.modulo_completadoScalarWhereInput | Prisma.modulo_completadoScalarWhereInput[];
};
export type modulo_completadoCreateWithoutModuloInput = {
    completado?: boolean;
    fecha_completado?: Date | string | null;
    usuario: Prisma.usuarioCreateNestedOneWithoutModulo_completadoInput;
};
export type modulo_completadoUncheckedCreateWithoutModuloInput = {
    id_modulo_completado?: number;
    id_usuario: number;
    completado?: boolean;
    fecha_completado?: Date | string | null;
};
export type modulo_completadoCreateOrConnectWithoutModuloInput = {
    where: Prisma.modulo_completadoWhereUniqueInput;
    create: Prisma.XOR<Prisma.modulo_completadoCreateWithoutModuloInput, Prisma.modulo_completadoUncheckedCreateWithoutModuloInput>;
};
export type modulo_completadoCreateManyModuloInputEnvelope = {
    data: Prisma.modulo_completadoCreateManyModuloInput | Prisma.modulo_completadoCreateManyModuloInput[];
    skipDuplicates?: boolean;
};
export type modulo_completadoUpsertWithWhereUniqueWithoutModuloInput = {
    where: Prisma.modulo_completadoWhereUniqueInput;
    update: Prisma.XOR<Prisma.modulo_completadoUpdateWithoutModuloInput, Prisma.modulo_completadoUncheckedUpdateWithoutModuloInput>;
    create: Prisma.XOR<Prisma.modulo_completadoCreateWithoutModuloInput, Prisma.modulo_completadoUncheckedCreateWithoutModuloInput>;
};
export type modulo_completadoUpdateWithWhereUniqueWithoutModuloInput = {
    where: Prisma.modulo_completadoWhereUniqueInput;
    data: Prisma.XOR<Prisma.modulo_completadoUpdateWithoutModuloInput, Prisma.modulo_completadoUncheckedUpdateWithoutModuloInput>;
};
export type modulo_completadoUpdateManyWithWhereWithoutModuloInput = {
    where: Prisma.modulo_completadoScalarWhereInput;
    data: Prisma.XOR<Prisma.modulo_completadoUpdateManyMutationInput, Prisma.modulo_completadoUncheckedUpdateManyWithoutModuloInput>;
};
export type modulo_completadoScalarWhereInput = {
    AND?: Prisma.modulo_completadoScalarWhereInput | Prisma.modulo_completadoScalarWhereInput[];
    OR?: Prisma.modulo_completadoScalarWhereInput[];
    NOT?: Prisma.modulo_completadoScalarWhereInput | Prisma.modulo_completadoScalarWhereInput[];
    id_modulo_completado?: Prisma.IntFilter<"modulo_completado"> | number;
    id_usuario?: Prisma.IntFilter<"modulo_completado"> | number;
    id_modulo?: Prisma.IntFilter<"modulo_completado"> | number;
    completado?: Prisma.BoolFilter<"modulo_completado"> | boolean;
    fecha_completado?: Prisma.DateTimeNullableFilter<"modulo_completado"> | Date | string | null;
};
export type modulo_completadoCreateWithoutUsuarioInput = {
    completado?: boolean;
    fecha_completado?: Date | string | null;
    modulo: Prisma.moduloCreateNestedOneWithoutModulo_completadoInput;
};
export type modulo_completadoUncheckedCreateWithoutUsuarioInput = {
    id_modulo_completado?: number;
    id_modulo: number;
    completado?: boolean;
    fecha_completado?: Date | string | null;
};
export type modulo_completadoCreateOrConnectWithoutUsuarioInput = {
    where: Prisma.modulo_completadoWhereUniqueInput;
    create: Prisma.XOR<Prisma.modulo_completadoCreateWithoutUsuarioInput, Prisma.modulo_completadoUncheckedCreateWithoutUsuarioInput>;
};
export type modulo_completadoCreateManyUsuarioInputEnvelope = {
    data: Prisma.modulo_completadoCreateManyUsuarioInput | Prisma.modulo_completadoCreateManyUsuarioInput[];
    skipDuplicates?: boolean;
};
export type modulo_completadoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: Prisma.modulo_completadoWhereUniqueInput;
    update: Prisma.XOR<Prisma.modulo_completadoUpdateWithoutUsuarioInput, Prisma.modulo_completadoUncheckedUpdateWithoutUsuarioInput>;
    create: Prisma.XOR<Prisma.modulo_completadoCreateWithoutUsuarioInput, Prisma.modulo_completadoUncheckedCreateWithoutUsuarioInput>;
};
export type modulo_completadoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: Prisma.modulo_completadoWhereUniqueInput;
    data: Prisma.XOR<Prisma.modulo_completadoUpdateWithoutUsuarioInput, Prisma.modulo_completadoUncheckedUpdateWithoutUsuarioInput>;
};
export type modulo_completadoUpdateManyWithWhereWithoutUsuarioInput = {
    where: Prisma.modulo_completadoScalarWhereInput;
    data: Prisma.XOR<Prisma.modulo_completadoUpdateManyMutationInput, Prisma.modulo_completadoUncheckedUpdateManyWithoutUsuarioInput>;
};
export type modulo_completadoCreateManyModuloInput = {
    id_modulo_completado?: number;
    id_usuario: number;
    completado?: boolean;
    fecha_completado?: Date | string | null;
};
export type modulo_completadoUpdateWithoutModuloInput = {
    completado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fecha_completado?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuario?: Prisma.usuarioUpdateOneRequiredWithoutModulo_completadoNestedInput;
};
export type modulo_completadoUncheckedUpdateWithoutModuloInput = {
    id_modulo_completado?: Prisma.IntFieldUpdateOperationsInput | number;
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    completado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fecha_completado?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type modulo_completadoUncheckedUpdateManyWithoutModuloInput = {
    id_modulo_completado?: Prisma.IntFieldUpdateOperationsInput | number;
    id_usuario?: Prisma.IntFieldUpdateOperationsInput | number;
    completado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fecha_completado?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type modulo_completadoCreateManyUsuarioInput = {
    id_modulo_completado?: number;
    id_modulo: number;
    completado?: boolean;
    fecha_completado?: Date | string | null;
};
export type modulo_completadoUpdateWithoutUsuarioInput = {
    completado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fecha_completado?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    modulo?: Prisma.moduloUpdateOneRequiredWithoutModulo_completadoNestedInput;
};
export type modulo_completadoUncheckedUpdateWithoutUsuarioInput = {
    id_modulo_completado?: Prisma.IntFieldUpdateOperationsInput | number;
    id_modulo?: Prisma.IntFieldUpdateOperationsInput | number;
    completado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fecha_completado?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type modulo_completadoUncheckedUpdateManyWithoutUsuarioInput = {
    id_modulo_completado?: Prisma.IntFieldUpdateOperationsInput | number;
    id_modulo?: Prisma.IntFieldUpdateOperationsInput | number;
    completado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fecha_completado?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type modulo_completadoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_modulo_completado?: boolean;
    id_usuario?: boolean;
    id_modulo?: boolean;
    completado?: boolean;
    fecha_completado?: boolean;
    modulo?: boolean | Prisma.moduloDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.usuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["modulo_completado"]>;
export type modulo_completadoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_modulo_completado?: boolean;
    id_usuario?: boolean;
    id_modulo?: boolean;
    completado?: boolean;
    fecha_completado?: boolean;
    modulo?: boolean | Prisma.moduloDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.usuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["modulo_completado"]>;
export type modulo_completadoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_modulo_completado?: boolean;
    id_usuario?: boolean;
    id_modulo?: boolean;
    completado?: boolean;
    fecha_completado?: boolean;
    modulo?: boolean | Prisma.moduloDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.usuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["modulo_completado"]>;
export type modulo_completadoSelectScalar = {
    id_modulo_completado?: boolean;
    id_usuario?: boolean;
    id_modulo?: boolean;
    completado?: boolean;
    fecha_completado?: boolean;
};
export type modulo_completadoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_modulo_completado" | "id_usuario" | "id_modulo" | "completado" | "fecha_completado", ExtArgs["result"]["modulo_completado"]>;
export type modulo_completadoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    modulo?: boolean | Prisma.moduloDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.usuarioDefaultArgs<ExtArgs>;
};
export type modulo_completadoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    modulo?: boolean | Prisma.moduloDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.usuarioDefaultArgs<ExtArgs>;
};
export type modulo_completadoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    modulo?: boolean | Prisma.moduloDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.usuarioDefaultArgs<ExtArgs>;
};
export type $modulo_completadoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "modulo_completado";
    objects: {
        modulo: Prisma.$moduloPayload<ExtArgs>;
        usuario: Prisma.$usuarioPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_modulo_completado: number;
        id_usuario: number;
        id_modulo: number;
        completado: boolean;
        fecha_completado: Date | null;
    }, ExtArgs["result"]["modulo_completado"]>;
    composites: {};
};
export type modulo_completadoGetPayload<S extends boolean | null | undefined | modulo_completadoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$modulo_completadoPayload, S>;
export type modulo_completadoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<modulo_completadoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Modulo_completadoCountAggregateInputType | true;
};
export interface modulo_completadoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['modulo_completado'];
        meta: {
            name: 'modulo_completado';
        };
    };
    /**
     * Find zero or one Modulo_completado that matches the filter.
     * @param {modulo_completadoFindUniqueArgs} args - Arguments to find a Modulo_completado
     * @example
     * // Get one Modulo_completado
     * const modulo_completado = await prisma.modulo_completado.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends modulo_completadoFindUniqueArgs>(args: Prisma.SelectSubset<T, modulo_completadoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__modulo_completadoClient<runtime.Types.Result.GetResult<Prisma.$modulo_completadoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Modulo_completado that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {modulo_completadoFindUniqueOrThrowArgs} args - Arguments to find a Modulo_completado
     * @example
     * // Get one Modulo_completado
     * const modulo_completado = await prisma.modulo_completado.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends modulo_completadoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, modulo_completadoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__modulo_completadoClient<runtime.Types.Result.GetResult<Prisma.$modulo_completadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Modulo_completado that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {modulo_completadoFindFirstArgs} args - Arguments to find a Modulo_completado
     * @example
     * // Get one Modulo_completado
     * const modulo_completado = await prisma.modulo_completado.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends modulo_completadoFindFirstArgs>(args?: Prisma.SelectSubset<T, modulo_completadoFindFirstArgs<ExtArgs>>): Prisma.Prisma__modulo_completadoClient<runtime.Types.Result.GetResult<Prisma.$modulo_completadoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Modulo_completado that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {modulo_completadoFindFirstOrThrowArgs} args - Arguments to find a Modulo_completado
     * @example
     * // Get one Modulo_completado
     * const modulo_completado = await prisma.modulo_completado.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends modulo_completadoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, modulo_completadoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__modulo_completadoClient<runtime.Types.Result.GetResult<Prisma.$modulo_completadoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Modulo_completados that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {modulo_completadoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Modulo_completados
     * const modulo_completados = await prisma.modulo_completado.findMany()
     *
     * // Get first 10 Modulo_completados
     * const modulo_completados = await prisma.modulo_completado.findMany({ take: 10 })
     *
     * // Only select the `id_modulo_completado`
     * const modulo_completadoWithId_modulo_completadoOnly = await prisma.modulo_completado.findMany({ select: { id_modulo_completado: true } })
     *
     */
    findMany<T extends modulo_completadoFindManyArgs>(args?: Prisma.SelectSubset<T, modulo_completadoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$modulo_completadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Modulo_completado.
     * @param {modulo_completadoCreateArgs} args - Arguments to create a Modulo_completado.
     * @example
     * // Create one Modulo_completado
     * const Modulo_completado = await prisma.modulo_completado.create({
     *   data: {
     *     // ... data to create a Modulo_completado
     *   }
     * })
     *
     */
    create<T extends modulo_completadoCreateArgs>(args: Prisma.SelectSubset<T, modulo_completadoCreateArgs<ExtArgs>>): Prisma.Prisma__modulo_completadoClient<runtime.Types.Result.GetResult<Prisma.$modulo_completadoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Modulo_completados.
     * @param {modulo_completadoCreateManyArgs} args - Arguments to create many Modulo_completados.
     * @example
     * // Create many Modulo_completados
     * const modulo_completado = await prisma.modulo_completado.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends modulo_completadoCreateManyArgs>(args?: Prisma.SelectSubset<T, modulo_completadoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Modulo_completados and returns the data saved in the database.
     * @param {modulo_completadoCreateManyAndReturnArgs} args - Arguments to create many Modulo_completados.
     * @example
     * // Create many Modulo_completados
     * const modulo_completado = await prisma.modulo_completado.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Modulo_completados and only return the `id_modulo_completado`
     * const modulo_completadoWithId_modulo_completadoOnly = await prisma.modulo_completado.createManyAndReturn({
     *   select: { id_modulo_completado: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends modulo_completadoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, modulo_completadoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$modulo_completadoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Modulo_completado.
     * @param {modulo_completadoDeleteArgs} args - Arguments to delete one Modulo_completado.
     * @example
     * // Delete one Modulo_completado
     * const Modulo_completado = await prisma.modulo_completado.delete({
     *   where: {
     *     // ... filter to delete one Modulo_completado
     *   }
     * })
     *
     */
    delete<T extends modulo_completadoDeleteArgs>(args: Prisma.SelectSubset<T, modulo_completadoDeleteArgs<ExtArgs>>): Prisma.Prisma__modulo_completadoClient<runtime.Types.Result.GetResult<Prisma.$modulo_completadoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Modulo_completado.
     * @param {modulo_completadoUpdateArgs} args - Arguments to update one Modulo_completado.
     * @example
     * // Update one Modulo_completado
     * const modulo_completado = await prisma.modulo_completado.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends modulo_completadoUpdateArgs>(args: Prisma.SelectSubset<T, modulo_completadoUpdateArgs<ExtArgs>>): Prisma.Prisma__modulo_completadoClient<runtime.Types.Result.GetResult<Prisma.$modulo_completadoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Modulo_completados.
     * @param {modulo_completadoDeleteManyArgs} args - Arguments to filter Modulo_completados to delete.
     * @example
     * // Delete a few Modulo_completados
     * const { count } = await prisma.modulo_completado.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends modulo_completadoDeleteManyArgs>(args?: Prisma.SelectSubset<T, modulo_completadoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Modulo_completados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {modulo_completadoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Modulo_completados
     * const modulo_completado = await prisma.modulo_completado.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends modulo_completadoUpdateManyArgs>(args: Prisma.SelectSubset<T, modulo_completadoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Modulo_completados and returns the data updated in the database.
     * @param {modulo_completadoUpdateManyAndReturnArgs} args - Arguments to update many Modulo_completados.
     * @example
     * // Update many Modulo_completados
     * const modulo_completado = await prisma.modulo_completado.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Modulo_completados and only return the `id_modulo_completado`
     * const modulo_completadoWithId_modulo_completadoOnly = await prisma.modulo_completado.updateManyAndReturn({
     *   select: { id_modulo_completado: true },
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
    updateManyAndReturn<T extends modulo_completadoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, modulo_completadoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$modulo_completadoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Modulo_completado.
     * @param {modulo_completadoUpsertArgs} args - Arguments to update or create a Modulo_completado.
     * @example
     * // Update or create a Modulo_completado
     * const modulo_completado = await prisma.modulo_completado.upsert({
     *   create: {
     *     // ... data to create a Modulo_completado
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Modulo_completado we want to update
     *   }
     * })
     */
    upsert<T extends modulo_completadoUpsertArgs>(args: Prisma.SelectSubset<T, modulo_completadoUpsertArgs<ExtArgs>>): Prisma.Prisma__modulo_completadoClient<runtime.Types.Result.GetResult<Prisma.$modulo_completadoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Modulo_completados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {modulo_completadoCountArgs} args - Arguments to filter Modulo_completados to count.
     * @example
     * // Count the number of Modulo_completados
     * const count = await prisma.modulo_completado.count({
     *   where: {
     *     // ... the filter for the Modulo_completados we want to count
     *   }
     * })
    **/
    count<T extends modulo_completadoCountArgs>(args?: Prisma.Subset<T, modulo_completadoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Modulo_completadoCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Modulo_completado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Modulo_completadoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Modulo_completadoAggregateArgs>(args: Prisma.Subset<T, Modulo_completadoAggregateArgs>): Prisma.PrismaPromise<GetModulo_completadoAggregateType<T>>;
    /**
     * Group by Modulo_completado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {modulo_completadoGroupByArgs} args - Group by arguments.
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
    groupBy<T extends modulo_completadoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: modulo_completadoGroupByArgs['orderBy'];
    } : {
        orderBy?: modulo_completadoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, modulo_completadoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModulo_completadoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the modulo_completado model
     */
    readonly fields: modulo_completadoFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for modulo_completado.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__modulo_completadoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    modulo<T extends Prisma.moduloDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.moduloDefaultArgs<ExtArgs>>): Prisma.Prisma__moduloClient<runtime.Types.Result.GetResult<Prisma.$moduloPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the modulo_completado model
 */
export interface modulo_completadoFieldRefs {
    readonly id_modulo_completado: Prisma.FieldRef<"modulo_completado", 'Int'>;
    readonly id_usuario: Prisma.FieldRef<"modulo_completado", 'Int'>;
    readonly id_modulo: Prisma.FieldRef<"modulo_completado", 'Int'>;
    readonly completado: Prisma.FieldRef<"modulo_completado", 'Boolean'>;
    readonly fecha_completado: Prisma.FieldRef<"modulo_completado", 'DateTime'>;
}
/**
 * modulo_completado findUnique
 */
export type modulo_completadoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the modulo_completado
     */
    select?: Prisma.modulo_completadoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the modulo_completado
     */
    omit?: Prisma.modulo_completadoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.modulo_completadoInclude<ExtArgs> | null;
    /**
     * Filter, which modulo_completado to fetch.
     */
    where: Prisma.modulo_completadoWhereUniqueInput;
};
/**
 * modulo_completado findUniqueOrThrow
 */
export type modulo_completadoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the modulo_completado
     */
    select?: Prisma.modulo_completadoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the modulo_completado
     */
    omit?: Prisma.modulo_completadoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.modulo_completadoInclude<ExtArgs> | null;
    /**
     * Filter, which modulo_completado to fetch.
     */
    where: Prisma.modulo_completadoWhereUniqueInput;
};
/**
 * modulo_completado findFirst
 */
export type modulo_completadoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the modulo_completado
     */
    select?: Prisma.modulo_completadoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the modulo_completado
     */
    omit?: Prisma.modulo_completadoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.modulo_completadoInclude<ExtArgs> | null;
    /**
     * Filter, which modulo_completado to fetch.
     */
    where?: Prisma.modulo_completadoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of modulo_completados to fetch.
     */
    orderBy?: Prisma.modulo_completadoOrderByWithRelationInput | Prisma.modulo_completadoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for modulo_completados.
     */
    cursor?: Prisma.modulo_completadoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` modulo_completados from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` modulo_completados.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of modulo_completados.
     */
    distinct?: Prisma.Modulo_completadoScalarFieldEnum | Prisma.Modulo_completadoScalarFieldEnum[];
};
/**
 * modulo_completado findFirstOrThrow
 */
export type modulo_completadoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the modulo_completado
     */
    select?: Prisma.modulo_completadoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the modulo_completado
     */
    omit?: Prisma.modulo_completadoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.modulo_completadoInclude<ExtArgs> | null;
    /**
     * Filter, which modulo_completado to fetch.
     */
    where?: Prisma.modulo_completadoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of modulo_completados to fetch.
     */
    orderBy?: Prisma.modulo_completadoOrderByWithRelationInput | Prisma.modulo_completadoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for modulo_completados.
     */
    cursor?: Prisma.modulo_completadoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` modulo_completados from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` modulo_completados.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of modulo_completados.
     */
    distinct?: Prisma.Modulo_completadoScalarFieldEnum | Prisma.Modulo_completadoScalarFieldEnum[];
};
/**
 * modulo_completado findMany
 */
export type modulo_completadoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the modulo_completado
     */
    select?: Prisma.modulo_completadoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the modulo_completado
     */
    omit?: Prisma.modulo_completadoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.modulo_completadoInclude<ExtArgs> | null;
    /**
     * Filter, which modulo_completados to fetch.
     */
    where?: Prisma.modulo_completadoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of modulo_completados to fetch.
     */
    orderBy?: Prisma.modulo_completadoOrderByWithRelationInput | Prisma.modulo_completadoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing modulo_completados.
     */
    cursor?: Prisma.modulo_completadoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` modulo_completados from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` modulo_completados.
     */
    skip?: number;
    distinct?: Prisma.Modulo_completadoScalarFieldEnum | Prisma.Modulo_completadoScalarFieldEnum[];
};
/**
 * modulo_completado create
 */
export type modulo_completadoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the modulo_completado
     */
    select?: Prisma.modulo_completadoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the modulo_completado
     */
    omit?: Prisma.modulo_completadoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.modulo_completadoInclude<ExtArgs> | null;
    /**
     * The data needed to create a modulo_completado.
     */
    data: Prisma.XOR<Prisma.modulo_completadoCreateInput, Prisma.modulo_completadoUncheckedCreateInput>;
};
/**
 * modulo_completado createMany
 */
export type modulo_completadoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many modulo_completados.
     */
    data: Prisma.modulo_completadoCreateManyInput | Prisma.modulo_completadoCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * modulo_completado createManyAndReturn
 */
export type modulo_completadoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the modulo_completado
     */
    select?: Prisma.modulo_completadoSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the modulo_completado
     */
    omit?: Prisma.modulo_completadoOmit<ExtArgs> | null;
    /**
     * The data used to create many modulo_completados.
     */
    data: Prisma.modulo_completadoCreateManyInput | Prisma.modulo_completadoCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.modulo_completadoIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * modulo_completado update
 */
export type modulo_completadoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the modulo_completado
     */
    select?: Prisma.modulo_completadoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the modulo_completado
     */
    omit?: Prisma.modulo_completadoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.modulo_completadoInclude<ExtArgs> | null;
    /**
     * The data needed to update a modulo_completado.
     */
    data: Prisma.XOR<Prisma.modulo_completadoUpdateInput, Prisma.modulo_completadoUncheckedUpdateInput>;
    /**
     * Choose, which modulo_completado to update.
     */
    where: Prisma.modulo_completadoWhereUniqueInput;
};
/**
 * modulo_completado updateMany
 */
export type modulo_completadoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update modulo_completados.
     */
    data: Prisma.XOR<Prisma.modulo_completadoUpdateManyMutationInput, Prisma.modulo_completadoUncheckedUpdateManyInput>;
    /**
     * Filter which modulo_completados to update
     */
    where?: Prisma.modulo_completadoWhereInput;
    /**
     * Limit how many modulo_completados to update.
     */
    limit?: number;
};
/**
 * modulo_completado updateManyAndReturn
 */
export type modulo_completadoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the modulo_completado
     */
    select?: Prisma.modulo_completadoSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the modulo_completado
     */
    omit?: Prisma.modulo_completadoOmit<ExtArgs> | null;
    /**
     * The data used to update modulo_completados.
     */
    data: Prisma.XOR<Prisma.modulo_completadoUpdateManyMutationInput, Prisma.modulo_completadoUncheckedUpdateManyInput>;
    /**
     * Filter which modulo_completados to update
     */
    where?: Prisma.modulo_completadoWhereInput;
    /**
     * Limit how many modulo_completados to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.modulo_completadoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * modulo_completado upsert
 */
export type modulo_completadoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the modulo_completado
     */
    select?: Prisma.modulo_completadoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the modulo_completado
     */
    omit?: Prisma.modulo_completadoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.modulo_completadoInclude<ExtArgs> | null;
    /**
     * The filter to search for the modulo_completado to update in case it exists.
     */
    where: Prisma.modulo_completadoWhereUniqueInput;
    /**
     * In case the modulo_completado found by the `where` argument doesn't exist, create a new modulo_completado with this data.
     */
    create: Prisma.XOR<Prisma.modulo_completadoCreateInput, Prisma.modulo_completadoUncheckedCreateInput>;
    /**
     * In case the modulo_completado was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.modulo_completadoUpdateInput, Prisma.modulo_completadoUncheckedUpdateInput>;
};
/**
 * modulo_completado delete
 */
export type modulo_completadoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the modulo_completado
     */
    select?: Prisma.modulo_completadoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the modulo_completado
     */
    omit?: Prisma.modulo_completadoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.modulo_completadoInclude<ExtArgs> | null;
    /**
     * Filter which modulo_completado to delete.
     */
    where: Prisma.modulo_completadoWhereUniqueInput;
};
/**
 * modulo_completado deleteMany
 */
export type modulo_completadoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which modulo_completados to delete
     */
    where?: Prisma.modulo_completadoWhereInput;
    /**
     * Limit how many modulo_completados to delete.
     */
    limit?: number;
};
/**
 * modulo_completado without action
 */
export type modulo_completadoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the modulo_completado
     */
    select?: Prisma.modulo_completadoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the modulo_completado
     */
    omit?: Prisma.modulo_completadoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.modulo_completadoInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=modulo_completado.d.ts.map