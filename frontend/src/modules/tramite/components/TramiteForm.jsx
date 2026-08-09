import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export function TramiteForm({ tramiteInicial, onSubmit, isSubmitting }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            marca: '', modelo: '', anio: '', placa: '', monto: '',
            cliente: { tipo_doc: 'DNI', num_doc: '', nombres: '', ap_paterno: '', ap_materno: '', email: '', telefono: '' },
        },
    });

    // Si estamos editando, precarga el formulario cuando llegue tramiteInicial
    useEffect(() => {
        if (tramiteInicial) {
            reset({
                marca: tramiteInicial.marca,
                modelo: tramiteInicial.modelo,
                anio: tramiteInicial.anio,
                placa: tramiteInicial.placa ?? '',
                monto: tramiteInicial.monto ?? '',
                cliente: {
                    tipo_doc: tramiteInicial.cliente?.tipo_doc,
                    num_doc: tramiteInicial.cliente?.num_doc,
                    nombres: tramiteInicial.cliente?.nombres,
                    ap_paterno: tramiteInicial.cliente?.ap_paterno,
                    ap_materno: tramiteInicial.cliente?.ap_materno ?? '',
                    email: tramiteInicial.cliente?.email ?? '',
                    telefono: tramiteInicial.cliente?.telefono ?? '',
                },
            });
        }
    }, [tramiteInicial, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <legend>Vehículo</legend>
                <input placeholder="Marca" {...register('marca', { required: 'Marca es requerida' })} />
                {errors.marca && <p style={{ color: 'red' }}>{errors.marca.message}</p>}

                <input placeholder="Modelo" {...register('modelo', { required: 'Modelo es requerido' })} />
                {errors.modelo && <p style={{ color: 'red' }}>{errors.modelo.message}</p>}

                <input placeholder="Año" type="number" {...register('anio', { required: 'Año es requerido' })} />
                {errors.anio && <p style={{ color: 'red' }}>{errors.anio.message}</p>}

                <input placeholder="Placa (opcional)" {...register('placa')} />
                <input placeholder="Monto (opcional)" type="number" step="0.01" {...register('monto')} />
            </fieldset>

            <fieldset>
                <legend>Cliente</legend>
                <select {...register('cliente.tipo_doc', { required: true })}>
                    <option value="DNI">DNI</option>
                    <option value="CE">CE</option>
                    <option value="RUC">RUC</option>
                </select>
                <input placeholder="N° Documento" {...register('cliente.num_doc', { required: 'N° documento es requerido' })} />
                {errors.cliente?.num_doc && <p style={{ color: 'red' }}>{errors.cliente.num_doc.message}</p>}

                <input placeholder="Nombres" {...register('cliente.nombres', { required: 'Nombres son requeridos' })} disabled={Boolean(tramiteInicial)} />
                {errors.cliente?.nombres && <p style={{ color: 'red' }}>{errors.cliente.nombres.message}</p>}

                <input placeholder="Apellido paterno" {...register('cliente.ap_paterno', { required: 'Apellido paterno es requerido' })} disabled={Boolean(tramiteInicial)} />
                <input placeholder="Apellido materno" {...register('cliente.ap_materno')} disabled={Boolean(tramiteInicial)} />
                <input placeholder="Email" type="email" {...register('cliente.email')} disabled={Boolean(tramiteInicial)} />
                <input placeholder="Teléfono" {...register('cliente.telefono')} disabled={Boolean(tramiteInicial)} />
            </fieldset>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
        </form>
    );
}