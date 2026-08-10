import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import type { Tramite } from '../tramite.types';

interface Props {
    tramiteInicial: Tramite | null;
    onSubmit: (datos: unknown) => void;
    isSubmitting: boolean;
}

export function TramiteForm({ tramiteInicial, onSubmit, isSubmitting }: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            marca: '', modelo: '', anio: '', placa: '', monto: '',
            cliente: { tipo_doc: 'DNI', num_doc: '', nombres: '', ap_paterno: '', ap_materno: '', email: '', telefono: '' },
        },
    });


    useEffect(() => {
        if (tramiteInicial) {
            reset({
                marca: tramiteInicial.marca,
                modelo: tramiteInicial.modelo,
                anio: String(tramiteInicial.anio),
                placa: tramiteInicial.placa ?? '',
                monto: tramiteInicial.monto != null ? String(tramiteInicial.monto) : '',
                cliente: {
                    tipo_doc: tramiteInicial.cliente?.tipo_doc ?? 'DNI',
                    num_doc: tramiteInicial.cliente?.num_doc ?? '',
                    nombres: tramiteInicial.cliente?.nombres ?? '',
                    ap_paterno: tramiteInicial.cliente?.ap_paterno ?? '',
                    ap_materno: tramiteInicial.cliente?.ap_materno ?? '',
                    email: tramiteInicial.cliente?.email ?? '',
                    telefono: tramiteInicial.cliente?.telefono ?? '',
                },
            });
        }
    }, [tramiteInicial, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="mb-4 border border-slate-200 rounded-md p-4">
                <legend className="text-xs font-semibold text-slate-500 uppercase px-1">Vehículo</legend>
                <input placeholder="Marca" {...register('marca', { required: 'Marca es requerida' })} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400" />
                {errors.marca && <p className="text-xs text-red-600 mb-2">{errors.marca.message}</p>}

                <input placeholder="Modelo" {...register('modelo', { required: 'Modelo es requerido' })} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400" />
                {errors.modelo && <p className="text-xs text-red-600 mb-2">{errors.modelo.message}</p>}

                <input placeholder="Año" type="number" {...register('anio', { required: 'Año es requerido' })} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400" />
                {errors.anio && <p className="text-xs text-red-600 mb-2">{errors.anio.message}</p>}

                <input placeholder="Placa (opcional)" {...register('placa')} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400" />
                <input placeholder="Monto (opcional)" type="number" step="0.01" {...register('monto')} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400" />
            </fieldset>

            <fieldset className="mb-4 border border-slate-200 rounded-md p-4">
                <legend className="text-xs font-semibold text-slate-500 uppercase px-1">Cliente</legend>
                <select {...register('cliente.tipo_doc', { required: true })} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400">
                    <option value="DNI">DNI</option>
                    <option value="CE">CE</option>
                    <option value="RUC">RUC</option>
                </select>
                <input placeholder="N° Documento" {...register('cliente.num_doc', { required: 'N° documento es requerido' })} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400" />
                {errors.cliente?.num_doc && <p className="text-xs text-red-600 mb-2">{errors.cliente.num_doc.message}</p>}

                <input placeholder="Nombres" {...register('cliente.nombres', { required: 'Nombres son requeridos' })} disabled={Boolean(tramiteInicial)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400" />
                {errors.cliente?.nombres && <p className="text-xs text-red-600 mb-2">{errors.cliente.nombres.message}</p>}

                <input placeholder="Apellido paterno" {...register('cliente.ap_paterno', { required: 'Apellido paterno es requerido' })} disabled={Boolean(tramiteInicial)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400" />
                <input placeholder="Apellido materno" {...register('cliente.ap_materno')} disabled={Boolean(tramiteInicial)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400" />
                <input placeholder="Email" type="email" {...register('cliente.email')} disabled={Boolean(tramiteInicial)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400" />
                <input placeholder="Teléfono" {...register('cliente.telefono')} disabled={Boolean(tramiteInicial)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400" />
            </fieldset>

            <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md disabled:opacity-50" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
        </form>
    );
}